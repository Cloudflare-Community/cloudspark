# CloudSpark

_As with all projects in the Cloudflare-Community Github Organization, and the `cloudflare.community` domain, this is not an official Cloudflare product. It is not officially supported by Cloudflare or its associates/partners. Views expressed here do not represent the views of Cloudflare or its employees. All rights to the Cloudflare Logo and other assets belong to Cloudflare Inc._

CloudSpark is a Node CLI tool that allows easy bootstrapping of a Cloudflare Developer Platform project, which may include a Worker, Pages site, or any other dependent bindings.

## Usage

Currently, CloudSpark only has the `init` command, which is also used by [`create-cloudspark`](https://npmjs.com/package/create-cloudspark).

```sh
$ npx cloudspark init --help
Usage: cloudspark init [options] [repo] [folder]

Initialize a new Worker

Arguments:
  repo         The repository to initialize.
  folder       The folder to initialize to.

Options:
  -y           Bypass prompts and use default values(doesn't apply to output folder conflicts).
  -f, --force  Force clone the template, ignoring existing files.
  -h, --help   display help for command
```
