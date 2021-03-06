/**
 * github-mirror -t `json -f token.private.json token` -n -x 2 -f
 */
import "@babel/polyfill";

import meow from "meow";

import mirror from ".";

const cli = meow(
  `
  Usage
    $ github-mirror [options]

  Options
    -h, --help                Show this help.
    -d, --dir                 Output directory. Exclude for dry run in GC'd temp dirs.
    -t, --token <token>       GitHub token
    -u, --user <user>         User (defaults to user for token)
    -o, --org <org>           Organization (instead of user)
    -x, --max-repos <max>     Max number of repos
    -n, --dry-run             Dry run.
    -s, --skip-clone          Skip cloning.
    -f, --fresh               Ignore cache.
    -c, --cache               Cache file.

  Examples
    $ github-mirror -t ABCDEFG

    $ github-mirror -t ABCDEFG -u AndersDJohnson

    $ github-mirror -t ABCDEFG -o verbose

`,
  {
    alias: {
      h: "help",
      d: "dir",
      t: "token",
      u: "user",
      o: "org",
      x: "max-repos",
      n: "dry-run",
      s: "skip-clone",
      f: "fresh",
      c: "cache"
    }
  }
);

var flags = cli.flags;

console.log(flags);

mirror({
  reposFile: flags.c, // e.g. './data/repos-cli.json'
  dir: flags.d, // e.g. './data/mirror-cli'
  maxRepos: flags.x,
  dryRun: flags.n,
  clone: !flags.s,
  token: flags.t,
  org: flags.o,
  user: flags.u,
  password: flags.p,
  fresh: flags.f
});
