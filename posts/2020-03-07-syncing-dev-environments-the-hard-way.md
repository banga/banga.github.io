# Syncing dev environments the hard way

If you use multiple machines for development, you probably run into the problem of keeping your dev environments in sync. For example, say your coworker introduced you to [fzf](https://github.com/junegunn/fzf) and you installed it on your work machine. Wouldn't it be nice if it was also installed on your machine at home when you opened it?

Some of these changes only require sharing dotfiles (e.g. `.bashrc` or `.zshrc`) which is simple enough to do via something like Dropbox. However, I wanted to sync much more, like my zsh plugins, vscode extensions, Mac apps, fonts etc.

Luckily, I enjoy spending hours of programming to save minutes of future drudgery. The solution I landed on (inspired by [mathiasbynens/dotfiles](https://github.com/mathiasbynens/dotfiles)) is a Github repo with files that describe the environment and a script that makes sure the environment matches them.

![Gif showing the sync script running](/assets/dotfiles-update.gif)

The rest of this post describes my setup in detail, but if you just want the repo, check out [banga/dotfiles-template](https://github.com/banga/dotfiles-template). It's a cleaned-up version of my personal setup that you can just clone and customize.

## How this works

Syncing happens via a shell script, [.updatelaptop](https://github.com/banga/dotfiles-template/blob/master/.updatelaptop), which is invoked automatically every time you start a new shell. Once a day, it will pull any updates from the repo and trigger the [update.py](https://github.com/banga/dotfiles-template/blob/master/update.py) file which ensures that the environment matches the expected state.

The [update.py](https://github.com/banga/dotfiles-template/blob/master/update.py) script runs a number of checks and runs fixes for checks that fail. Here are the notable ones:

### Dotfiles

This ensures that the dotfiles in my home directory are symlinked to the dotfiles checked into this repo. I keep my common shell settings in `.shrc` and machine-specific settings in `.hyperlocal.shrc`, which is gitignored.

### Brew

The `BrewBundle` ensures that everything in the checked-in `Brewfile` is installed. This is the most powerful check for ensuring a consistent environment across machines. I can even use it to sync my favorite monospace font: [JetBrains mono](https://www.jetbrains.com/lp/mono/).

### Zsh

The `OhMyZsh` and `OhMyZshCustomPlugins` checks ensure that [Oh My Zsh](https://ohmyz.sh/) and the plugins I use for it are installed. The plugins are included as submodules in this repo and symlinked to the zsh directory.

### Git commit previews

This copies a custom CSS file I wrote to make `git instaweb` output look similar to Github. Along with this file, I have a shell command that allows me to preview my latest commit before pushing:

```sh
function gcpr() {
    pkill -9 lighttpd
    git instaweb start -l
    commit=$(git rev-parse ${1:-"HEAD"})
    # Assumes git instaweb is running on port 1234
    open "http://127.0.0.1:1234/?p=.git;a=commitdiff;ds=sidebyside;h=$commit"
}
```

![Gif showing git commit preview command working](/assets/git-commit-preview.gif)

### VS Code

The `VSCodeSyncing` and `VSCodeExtensions` checks ensure that my vscode settings and extensions are synced across machines. I find this particularly useful because I often make small tweaks to vscode in one machine and end up needing them on another.

## Dropbox

I still end up using Dropbox for syncing some settings which I change often enough for it to be too annoying to have to check-in into a repo and push. These include [iTerm2 settings]({{ site.baseurl }}{% post_url 2020-03-01-little-known-features-of-iterm2 %}), Karabiner configurations, Alfred settings etc.