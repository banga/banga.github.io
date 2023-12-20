# I spent way too long building a blog generator

...and must therefore write about how I did it to alleviate the guilt.

## Hiding from Dr Jekyll

As you can probably tell, this blog has been inactive since the peak of March 2020, where I apparently reacted to the pandemic with a surge in creativity.

Back then, the blog was hosted on [GitHub pages](https://pages.github.com/), which used [Jekyll](https://jekyllrb.com/) to build and serve the blog from a set of markdown files. This was fine to start with, but it wasn't easy to set up and configure, and soon bit rotted enough to seriously discourage touching it.

I have been taking a break from programming for the past few months and as I return from it and start a job search, I realized I should clean up my online presence. So I decided it was finally time to get rid of the whole Jekyll setup.

My initial investigation revealed that GitHub now allows you to deploy pages using GitHub actions, so you can pick from a plethora of static site generators. However, after the previous experience with Jekyll, I wanted something very minimal that I could jump back into a year from now and not have to re-learn.

So, I decided to do what every programmer must do at least once in their life – write a tool to generate their website.

## Markdown is not a standard

My previous 3 posts were all authored in markdown, with several eccentricities peculiar to Jekyll (e.g. creating anchor links to headings requires special syntax). Such modifications are affectionately referred to as "extensions" in most markdown implementations.

The eventual result is that no two markdown implementations are exactly alike and once you venture out of the basic formatting syntax, you are going to spend more time learning the syntax and less time writing.

As a result, I tend to dislike products that use markdown as their primary input format, or use it as an interchange format with other applications. _However_, I am also too lazy to rewrite my past posts in html or some such, which maybe explains why us programmers return to markdown so often.

So, I realized my first requirement was to generate the html for my posts using the existing markdown as a source.
