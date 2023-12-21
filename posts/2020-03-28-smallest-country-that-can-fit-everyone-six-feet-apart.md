# What's the smallest country that can fit everyone standing six feet apart?

Today's [xkcd](https://xkcd.com/2286/) got me wondering how much land would we
need if everyone stood six feet apart.

## Methodology

### We are all but spherical cows

If we want everyone to keep a minimum distance of $$r$$ from each other, the
problem boils down to efficiently packing $$n$$ circles of radius $$r$$ in the
smallest area possible. This can be calculated as follows:

Area of a circle with radius $$r$$,

$$A_r = \pi r^2 $$

Optimal circle packing density[^1],

$$\eta  = \frac{\pi\sqrt{3}}{6}$$

Area required for $$n$$ people,

$$
\begin{align}
    A_n & = n \cdot \frac{A_r}{\eta} \\
        & = n \cdot \frac{\pi r^2}{\frac{\pi \sqrt{3}}{6}} \\
        & = 2 \sqrt{3} \cdot n \cdot r^2
\end{align}
$$

### Crunching the numbers

Plugging in the current world population[^2] and the recommended distance of 6 feet[^3]:

$$ n = \text{7,773,861,168} $$

$$ r = 6\text{ft} $$

we get

$$
\begin{align}
    A_n & = 9.695×10^{11} \text{ft}^2 \\
        & = 34,775 \text{mi}^2 \\
\end{align}
$$

### And the answer is...

According to Wikipedia[^4], this is just shy of the land area of **Portugal 🇵🇹**.
We could also squeeze into **Hungary 🇭🇺** if some of us were willing to swim.

## Corollaries

### How many people can San Francisco fit standing 6 feet apart?

Dividing the area of San Francisco by $$2 \sqrt{3} \cdot 36 \text{ft}^2$$, gives
us around **10.5 million** people.

### Are there any countries where people couldn't stand 6 feet apart?

1 square mile of land can have 223,563 people standing 6 feet apart. This is
much higher than the most densely populated countries and territories in the
world[^5].

[^1]: [Circle packing - Wikipedia](https://en.wikipedia.org/wiki/Circle_packing)
[^2]: [Current World Population - Worldometers](https://www.worldometers.info/world-population/)
[^3]: [Prevention of Coronavirus Disease 2019 (COVID-19) - CDC](https://www.cdc.gov/coronavirus/2019-ncov/prepare/prevention.html)
[^4]: [List of countries and dependencies by area - Wikipedia](https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_area)
[^5]: [List of countries and dependencies by population density - Wikipedia](https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_population_density)
