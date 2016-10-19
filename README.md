# Intersectional Wage Gap Calculator and Graph Generator

A tool for visualizing data on income disparity between various groups

### Installation

- Clone or download the repo
- Navigate to the repo root in the terminal
- Run `$npm install`
- Run `$npm start`
- Navigate in your browser to http://localhost:4040 (or your PORT environment variable's value)

### Usage

Choose type of graph, then choose variables to be included (for example gender and race), choose a number of profiles to compare, and choose values for each variable for each profile.

Intended for individual use as well as in educational settings spanning from elementary through higher education.

### Theoretical Basis

All existing wage gap calculators we could find developed only one profile for comparison, which makes a number of problematic assumptions about both the user of the calculator and about gender generally. It assumes:

1. Only women will use a wage gap calculator.
2. These women only wish to know the wage gap for their own situation and not explore the data for other groups.
3. These women will only to compare themselves to men.
4. They only wished to compare themselves to men as a whole rather than specific groups of men (men of a certain age, race, location, etc.)

This ends up reinforcing the long-problematic assumption of a single, monolithic, hegemonic concept of masculinity, rather than varied masculinities each of which may itself be the nexus of an intersectional identity and accordingly valued or devalued in the economy. For more on concepts of alternative/multiple masculinities, see R. W. Connell, _Masculinities_ (2005), among many, many others (feel free to contact product owner for more resources on critical theory regarding masculinities).

It also assumes the users are not interested in comparing themselves within sub-groups, such as women of color comparing their pay gap to white women, or men in Southern states comparing their gap to men in New York, or women working in law comparing their pay gap to women in programming (in law a woman makes 53.3% of what a man makes, in programming it's 86.9%).

These additions make the tool both more informative generally and also more useful, for example, to people trying to figure out which field to pursue or where to seek work. We intend this to be a practical tool for young people trying to decide on a career as well as anyone considering a career change, in addition to it's informative and educational value.

### That'd be neat . . .

In that vein, some **future features** we were hoping to add but have not yet had time to do so:
- Allow for factoring in cost of living in certain areas (would make the tool have more utility for people trying to decide where to settle for their careers)
- Allow for creating more varied, fully-fleshed out profiles, such as
  - Including more variables per profile
  - Including other relevant and important variables like:
    - Ability status (both mental and physical)
    - Cis-/transgender
    - Educational background
    - English as native versus second language
    - Sexual orientation
    - Socio-economic class (as a child)
    - and more...
- Constructing complex queries to the US Census API
  - Also cacheing the data from common queries to load faster (ideally using an LRU system)
- Display of most popular graphs on the home page
  - Storage of the data for said graphs
  - The ability to upvote/downvote graphs
- The ability to sign in with and share graphs on social media outlets

### Contributing

Contact a team member if you're interested in contributing!

### History

This is the first version, done as a Greenfield project for the Makersquare Full-Stack Javascript bootcamp.

### Credits

- Product Owner (as Agile role): J. Christian Straubhaar-Jones
- Scrum Master: Calvin Kniffin
- Team Members:
  - Brett Nelson
  - Zach Raymer

### License

Available for non-commercial use with alteration and with proper citation of source.

### Further investigation

Prior wage gap calculators (let us know if yours has been left out, we'll add it to the list):
http://motto.time.com/4201637/pay-gap-calculator/
http://equalpayma.com/en/Calculator
http://www.wageproject.org/files/gap_calc.php
https://www.omnicalculator.com/other/gender-wage-gap
https://www.weforum.org/agenda/2015/11/gender-gap-calculator-2015/ (this one gives you your age when pay equality will be reached if current trends continue)
