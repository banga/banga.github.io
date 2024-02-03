# Learning Rust in 3 attempts

One of my earliest programming languages was C++, which for all its warts, was a giant leap from my first language, BASIC. I especially enjoyed understanding precisely what's happening at the CPU and memory level[^1] to my program when it runs.

Once I got a Real Job, I moved on to higher level languages and spent the last decade mostly writing JavaScript and Python. These are both exceedingly powerful languages that have been a joy to build stuff with, but they do sometimes make you miss the low level control of a systems language[^2]. But C++ had moved on quite a bit since I last wrote it and it didn't really entice me as a pleasant language to use on the side.

So Rust had my attention when I first heard of it and made a few attempts at learning it. I've finally reached a point where I feel comfortable and productive in it, so I thought I'd log my progress in case it helps someone get there faster.

## Attempt 1: RTFM

For all of the languages I've learned in recent memory (TypeScript, Go, Python), my process was the same – read the official manual, start using it and read the documentation as needed. So back in 2019, I did the same with Rust. I read [The Book](https://doc.rust-lang.org/book/) and started using it for some mini projects.

But this time I didn't feel productive enough to actually start building with it. I _could_ get programs to work by pattern matching and trying things somewhat randomly to appease the compiler, but it didn't feel like I knew what was really going on. It was a while back, but I felt that The Book didn't quite have a specific audience in mind and tended to distribute time to topics unevenly in relation to their difficulty.

## Attempt 2: A hobby project

A number of people mentioned how they eventually got productive by just writing more rust, so I thought I would try that by using it for a big project.

One of my favorite projects is ray tracing, ever since I learned how it works in [POV-Ray](https://www.povray.org/)'s manual (where they [build a ray tracer _within_ POV-Ray](https://www.povray.org/documentation/3.7.0/t2_3.html#t2_3_11) using its meta language), converted it into a C++ program and rendered it in glorious `800x600x24` resolution via extended [Mode 13h](https://en.wikipedia.org/wiki/Mode_13h). I still cannot help but be amazed that a bit of high school level math can produce such realistic images. So I thought it would be fun to write one in Rust.

I wrote a very basic spheres-only version in July 2022 and got it to do multi-threaded rendering in about 5 days. This was substantial enough to actually feel productive, and a testament to Rust's design that adding correct concurrency was not particularly difficult. I was even more impressed when I swapped out my multi-threading code with the `crayon` library's parallel iterator.

However, the raytracer was pretty limited at this point. There's only so much you can render with matte spheres:

![A raytraced image of some spheres shaped like the Google logo](/assets/raytraced-logo.png)

So I opened up the [PBR book](https://www.pbr-book.org/) and slowly added more features while keeping my day job. While I was learning a number of things around this time (like [multiple importance sampling](https://www.pbr-book.org/3ed-2018/Monte_Carlo_Integration/Importance_Sampling#MultipleImportanceSampling) and [Radiometry](https://www.pbr-book.org/3ed-2018/Color_and_Radiometry/Radiometry)), I wasn't learning much Rust.

### It looks like you are trying to write a program

In 2023, I had a break from work and had a lot more time to spend on it. At this point, [GitHub Copilot](https://github.com/features/copilot) had come into being and I enabled it for this project. It had two interesting effects:

1. It was good at filling in the obvious and repetitive code that needs to be written in graphics, like repeating a calculation for $x$, $y$ and $z$ dimensions.
2. It would sometimes show me new features of rust that I was not aware of.
   With its help, I managed to even write a parser for a custom scene file format for the raytracer, with some particularly [clever](https://github.com/banga/craytracer/blob/4820473911886343cc737bf0cc639e55efc89b86/src/scene_parser.rs#L724-L748) logic to make it concise and extensible.

However, while it made me feel more productive and let me focus on figuring out the trickier aspects of raytracing, I realized that my understanding of rust wasn't getting particularly clearer. So I eventually disabled it and decided to learn it the old fashioned way.

## Attempt 3: Read a book

I picked up the [Programming Rust, 2nd Edition](https://www.oreilly.com/library/view/programming-rust-2nd/9781492052586/) ebook, which seemed to be the most common recommendation. I made my way through it slowly at first but I started to notice that I was "getting it" more now. It's hard to say whether this was a result of better writing or having had more practice with it, but it didn't take long to realize that the book was clearing the fog. I definitely felt that the authors were good at realizing which parts deserved more elaboration and which didn't.

Around this time, I left my job and took a complete break from programming. Then around the end of 2023, after I did [Advent of Code](https://adventofcode.com/) in Rust, I got a second wind and started reading the book again. As I learned things I could use in the raytracer, I would go back and [apply](https://github.com/banga/craytracer/commit/9ff0d0498ad5524cd5ae4c2e16d4dcb47980a9a8) [them](https://github.com/banga/craytracer/commit/e31a0249d15c1c614d61d7b11ed83350b7accf0f) [to](https://github.com/banga/craytracer/commit/6b92724ebc8740685312d92c3d67bebda5ccabc7) it. I eventually once again got distracted by the graphics and added several sophisticated features to get to the point of rendering images like this:

![A raytraced image of a staircase with textures, area lighting](/assets/staircase.png)

Anyway, I did finish the book once the raytracing side quest was done (for now). While there are a few chapters that will need a revisit when I actually need to use them (Async, FFI, unsafe rust), I ended it feeling a lot more comfortable with the language.

For the most recent work I did in the language, I felt nearly as productive as I had previously in TypeScript or Python[^3]. Rust is a vast language and sometimes the safety checks _can_ get quite onerous, so I'm sure I won't always feel this optimistic about it, but it's nice to not be intimidated by a popular systems level language anymore.

[^1]: I was equally disheartened and delighted to later learn that the simple mental model I had for the cpu and memory were yet further from reality. Compiler optimizations, pipelining, branch prediction, out of order execution etc. were all fascinating and slightly terrifying things to learn about.
[^2]: Especially when the GC comes a knockin'.
[^3]: Each of these languages excel in their own domains, so perhaps this isn't totally accurate. I wouldn't be as productive building websites in Rust as I would be in TypeScript, but the opposite is true for writing, say, a database.
