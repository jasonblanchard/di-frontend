.PHONY: build

provision:
	pulumi up

build:
	PUBLIC_URL=https://di-frontend-aad319a.s3.amazonaws.com npm run build

push: build
	aws s3 sync ./build s3://di-frontend-aad319a --acl public-read