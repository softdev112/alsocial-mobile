# Git Strategy Documentation

## Contents

-   [Git Branching Strategy](#git-branching-strategy)
    -   [GitFlow Overview](#gitflow-overview)
    -   [Types of Branches](#types-of-branches)
        -   [Main Branches](#main-branches)
        -   [Support Branches](#support-branches)
            -   [Feature Branches](#feature-branches)
            -   [Release Branches](#realese-branches)
            -   [Hotfix Branches](#hotfix-branches)
    -   [Workflows](#workflows)
        -   [Feature Branches Workflow](#feature-branches-workflow)
        -   [Release Branches Workflow](#release-branches-workflow)
        -   [Hotfix Branches Workflow](#hotfix-branches-workflow)
-   [Git Tagging Strategy](#git-tagging-strategy)

## Git Branching Strategy

### GitFlow Overview

GitFlow is a branching model for Git version-control system. This model promotes parallel development by separating work-in-progress and finished work. Furthermore, a separate branch is dedicated for each feature which makes task-switching and collaboration very simple. Additionally, GitFlow introduces release branches for pre-release tuning and hotfix branches for unplanned live production bugfixes. Below is an example of a working GitFlow system.

![git-flow-overview](https://nvie.com/img/git-model@2x.png)

### Types of Branches

The GitFlow model separates all branches into two categories: main and support branches.

#### Main Branches

The central remote repository or `origin` holds two branches with _infinite lifetime_, meaning that they will never be removed:

-   `master`
-   `develop`

The `master` branch is a main branch where the source code of `HEAD` reflects a _production-ready state_. The `develop` branch is a main branch where the source code of `HEAD` always reflects a state with the latest delivered development changes for the next release. When the source code in the `develop` branch reaches a stable point and is ready to be released, all the changes should be merged back into `master` and then tagged with a _version number_. In other words, every merge to `master` is a new production release.

#### Support Branches

GitFlow incorporates multiple support branches to aid parallel development between team members, ease tracking of features, prepare for production releases and to assist in quickly fixing live production problems. Unlike main branches, these branches always have _limited lifetime_ until they are removed eventually. The different types of support branches used are:

-   [Feature branches](#feature-branches)
-   [Release branches](#release-branches)
-   [Hotfix branches](#hotfix-branches)

Each of these branches have a specific purpose and are bounded to strict rules as to which branches may be their originating branch, and which branches must be their merge targets.

##### Feature Branches

Feature branches are used to develop new features for the upcoming or distant future release. The feature branches exist as long as the features are in development. Eventually, these branches are either merged into `develop` for the upcoming release or discarded due to a feature's irrelevancy. Below are some requirements for creating a feature branch:

-   Must branch off from `develop`
-   Must merge back into `develop` when finished
-   Must be named `feature/JIRA-Ticket-Number/feature-name`
    -   e.g. `feature/CCA-20/main-screen-sidebar`

Below is an example of a feature branch.

![feature-branch](https://nvie.com/img/fb@2x.png)

##### Release Branches

Release branches support preparation of a new production release. They allow for minor bug fixes and preparing meta-data for a release like build date and _release version number_. By having a separate release branch, the `develop` branch can work on new features for the next release in parallel.
A release branch is created when the current state of the `develop` branch reflects the desired new release. All the features that are targeted to the current release should have been merged into the `develop` branch before a release branch is created. Any future features should wait until the release branch is branched off the `develop` branch.
Once the release branch is created, a _release version number_ is assigned. Version number is determined by the project's rules on version number bumping. See [Git Tagging Strategy](#git-tagging-strategy).
Here are some requirements for a release branch:

-   Must branch off from `develop`
-   Must merge into `develop` and `master`
-   Must be named `release/release-version-number`
    -   e.g. `release/1.2`

Below is an example of a release branch.

![release-branch](https://player.slideplayer.com/30/9544583/data/images/img3.jpg)

##### Hotfix Branches

Hotfix branches are created when the live production version is in an undesirable state. When a critical bug in production requires immediate resolution, a hotfix branch is dedicated to resolve the issue and is merged back into the `master` branch after completion. This ensures that the `develop` branch continues to work on features while a critical bug is being fixed at the same time.
Here are some requirements for a hotfix branch:

-   Must branch off `master`
-   Must merge into `master`
-   Must be named `hotfix/JIRA-Ticket-Number/hotfix-name`
    -   e.g. `hotfix/CCA-21/broken-sidebar-link`

Below is an example of a hotfix branch.

![hotfix-branch](https://nvie.com/img/hotfix-branches@2x.png)

### Workflows

#### Feature Branches Workflow

##### Create a Feature Branch

When starting work on a new feature, branch off from the `develop` branch.

```
$ git checkout -b feature/CCA-20/main-screen-sidebar develop
Switched to a new branch "feature/CCA-20/main-screen-sidebar"
```

##### Finishing a Feature Branch

Finished features can merged into the `develop` branch to add them to the upcoming release:

```
$ git checkout develop
Switched to branch 'develop'
$ git merge --no-ff feature/CCA-20/main-screen-sidebar
Updating ea1b82a..05h9757
(Summary of changes)
$ git branch -d feature/CCA-20/main-screen-sidebar
Deleted branch feature/CCA-20/main-screen-sidebar (was 05h9757).
$ git push origin develop
```

The `--no-ff` flag causes the merge to always create a new commit object, even if fast-forward could be performed. This avoids losing information about the historical existence of a feature branch and grouping all commits into a single branch.

![effect-of-using-no-fast-forward-flag](https://nvie.com/img/merge-without-ff@2x.png)
In the latter case, it's impossible to see from Git history which commits were from the feature branch. In case of error, reverting back a whole feature could be a difficult task. On the other hand, the `--no-ff` flag preserves all feature branches' Git histories for easier reversions.

### Release Branches Workflow

#### Create a Release Branch

Release branches are created from the `develop` branch. Based on the size of the release, a new version number is assigned to the name of the release branch. For example, last release was 1.1.5 and since then many major features were added so the new version number was bumped up to 1.2.

```
$ git checkout -b release/1.2 develop
Switched to a new branch "release/1.2"
$ ./bump-version.sh 1.2
Files modified successfully, version bumped to 1.2.
$ git commit -a -m "Bumped version number to 1.2"
[release/1.2 74d9424] Bumped version number to 1.2
1 files changed, 1 insertions(+), 1 deletions(-)
```

Here `bump-version.sh` is a possible script that updates the project version to the newly assigned version number. The new release branch can only accept bug fixes for the proposed of release. Any feature branches should be merged to the `develop` branch instead.

#### Finishing a Release Branch

When the state of the release branch is ready to be released, the branch will be merged into the `master` branch. Next, the new merge commit onto the `master` branch will be tagged with a version number for future references. Then, the changes on the release branch need to be merge into the `develop` branch to keep all main branches up-to-date.
First we merge to the `master` branch and tag the new commit:

```
$ git checkout master
Switched to branch 'master'
$ git merge --no-ff release/1.2
Merge made by recursive.
(Summary of changes)
$ git tag -a 1.2
```

Then we merge the release branch onto the `develop` branch:

```
git checkout develop
Switched to branch 'develop'
$ git merge --no-ff release/1.2
Merge made by recursive.
(Summary of changes)
```

The above step could lead to merge conflicts on the `develop` branch. This has to be resolved and committed to the `develop` branch.
Once the merge conflicts are resolved, we can safely delete the release branch:

```
$ git branch -d release/1.2
Deleted branch release/1.2 (was ff452fe).
```

### Hotfix Branches Workflow

#### Creating a Hotfix Branch

Suppose the live production version is 1.3 and has a severe bug. A hotfix branch is created off the `master` branch with a bumped up version of 1.3.1 dedicated to resolved the issue.

```
$ git checkout -b hotfix/CCA-21/broken-sidebar master
Switched to a new branch "hotfix/CCA-21/broken-sidebar"
$ ./bump-version.sh 1.3.1
Files modified successfully, version bumped to 1.3.1.
$ git commit -a -m "Bumped version number to 1.3.1"
[hotfix/CCA-21/broken-sidebar 41e61bb] Bumped version number to 1.3.1
1 files changed, 1 insertions(+), 1 deletions(-)
```

Similar to creating a release branch, `bump-version.sh` is used to bump up the version number.

```
$ git commit -m "Fixed broken sidebar"
[hotfix/CCA-21/broken-sidebar abbe5d6] Fixed severe production problem
5 files changed, 32 insertions(+), 17 deletions(-)
```

Any fixing code is committed to this hotfix branch.

#### Finishing a Hotfix Branch

When finished with a bugfix, merge the hotfix branch into the `master` branch and add the new version number. The hotfix branch should also be merged into the `develop` branch to preserve the fixes.

```
$ git checkout master
Switched to branch 'master'
$ git merge --no-ff hotfix/CCA-21/broken-sidebar
Merge made by recursive.
(Summary of changes)
$ git tag -a 1.3.1
```

```
$ git checkout develop
Switched to branch 'develop'
$ git merge --no-ff hotfix/CCA-21/broken-sidebar
Merge made by recursive.
(Summary of changes)
```

After both merges complete, the hotfix branch can be safely deleted.

```
$ git branch -d hotfix/CCA-21/broken-sidebar
Deleted branch hotfix/CCA-21/broken-sidebar (was abbe5d6).
```

## Git Tagging Strategy

Release versions will follow a **semantic versioning system** where the first number represents a major release e.g. 1.0.0 or 3.0.0, the second number represents a minor release e.g 1.2.0, and the third number represents a patch release e.g. 1.2.1.
The classification of the releases are determined by the business' goals for a given release. A major release usually indicates a substantial alteration of the code base while a minor release only adds a number of features. A patch release is used to override a live production release with severe bugs.
Every new release will have a **version number bumping** based on it's content. For example, a patch release would increase from 1.2.0 to 1.2.1 while a minor release would increase from 1.2.0 to 1.3.0.
