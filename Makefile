.PHONY: build

provision:
	pulumi up

build:
	PUBLIC_URL=https://$$(pulumi stack output bucketDomainName) npm run build

push: build
	aws s3 sync ./build s3://$$(pulumi stack output bucket) --acl public-read