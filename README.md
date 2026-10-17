# static-site-demo

A demo of building a static website with Claude Code and hosting it on AWS. The example site is for Juniper Coffee, a fictional San Francisco coffee shop.

## What's in this repo

- `site/` holds the Juniper Coffee website. It is plain HTML, CSS and JavaScript, with every asset kept in the folder.
- `architecture.html` is the architecture diagram shown in the video. It is published at https://refaktr-io.github.io/static-site-demo/architecture.html.

## Demo prompt

This is the prompt used in the video to build and deploy the site with Claude Code. Paste it into a Claude Code session opened in this repo.

```text
Build and deploy a polished single-page website for a fictional San Francisco coffee shop called Juniper Coffee.
Make it feel like a real independent SF cafe with a premium, editorial, design-forward look. Use strong typography, generous spacing, subtle interactions, and a restrained warm aesthetic.
Include:

* hero
* about section
* 4–6 featured drinks or pastries
* hours and fictional SF location
* a few customer quotes
* footer

Make it fully responsive.
Keep it entirely static using HTML, CSS, and JavaScript. No backend, database, authentication, framework, build process, or external application services.
Keep all required assets in the project.
Use the available Frontend Design capabilities.
Deploy the site to AWS using AWS Agent Toolkit and the AWS CLI profile `<aws-profile>`.
Choose the simplest secure, low-cost AWS architecture appropriate for this static site. Prefer managed services and avoid unnecessary complexity.
Provision the AWS resources directly, without infrastructure as code.
Before making AWS changes, briefly show:

* the proposed architecture
* the resources you will create
* approximate cost

Wait for my approval before provisioning anything.
After approval:

* create the AWS resources
* deploy the site
* verify the origin is not publicly exposed
* verify the site is served through CloudFront
* return the final public URL

Start with the design direction and proposed AWS architecture.
```

### Before you run it

- Install the AWS CLI and create a named profile for the deployment, backed by an IAM role in the target account. Replace `<aws-profile>` in the prompt with that profile's name.
- Give the role permission to create and configure S3 buckets, upload objects, and manage CloudFront distributions, origin access controls and invalidations. Scope it to what this demo needs rather than full administrator access.
- Install the Agent Toolkit for AWS plugin in Claude Code, so Claude can work with your AWS account.
- Install the Frontend Design plugin in Claude Code.
