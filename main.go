package main

import (
	"fmt"

	"github.com/pulumi/pulumi-aws/sdk/v4/go/aws/apigatewayv2"
	"github.com/pulumi/pulumi-aws/sdk/v4/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi/config"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		conf := config.New(ctx, "")

		// Create an AWS resource (S3 Bucket)
		bucket, err := s3.NewBucket(ctx, "di-frontend", &s3.BucketArgs{
			Website: &s3.BucketWebsiteArgs{
				IndexDocument: pulumi.String("index.html"),
				ErrorDocument: pulumi.String("index.html"),
			},
		})
		if err != nil {
			return err
		}

		// Export the name of the bucket
		ctx.Export("bucket", bucket.Bucket)
		ctx.Export("bucketDomainName", bucket.BucketDomainName)

		apigwid := conf.Require("apigwid")

		apigw, err := apigatewayv2.GetApi(ctx, "gateway", pulumi.ID(apigwid), &apigatewayv2.ApiState{})
		if err != nil {
			return err
		}

		uri := bucket.Bucket.OutputState.ApplyT(func(name string) string {
			return fmt.Sprintf("http://%s.s3-website-us-east-1.amazonaws.com/", name)
		}).(pulumi.StringOutput)

		integration, err := apigatewayv2.NewIntegration(ctx, "integration", &apigatewayv2.IntegrationArgs{
			ApiId:             apigw.ID(),
			IntegrationType:   pulumi.String("HTTP_PROXY"),
			IntegrationUri:    uri,
			IntegrationMethod: pulumi.String("GET"),
		})
		if err != nil {
			return err
		}

		target := integration.ID().OutputState.ApplyT(func(id pulumi.ID) string {
			return fmt.Sprintf("integrations/%s", id)
		}).(pulumi.StringOutput)

		_, err = apigatewayv2.NewRoute(ctx, "route", &apigatewayv2.RouteArgs{
			ApiId:    apigw.ID(),
			RouteKey: pulumi.String(fmt.Sprintf("%v%v", "$", "default")),
			Target:   target,
		})
		if err != nil {
			return err
		}

		return nil
	})
}
