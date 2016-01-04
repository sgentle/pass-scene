Pass-scene
==========

Generating memorable passwords is a hard problem. Perhaps the best available current option is [diceware](diceware.com), which generates fairly short, fairly memorable passphrases. But, if you don't care about length, could you generate more memorable phrases for use by everyday people?

Pass-scenes are an attempt to create a more meaningful passphrase generator by using templates for different parts of speech and kinds of words, derived from [Princeton's WordNet database](https://wordnet.princeton.edu/). You can view a [demo](https://demos.samgentle.com/pass-scene) here, or install it as an npm module and try it out for yourself.

There's some significant future work to do here, mainly:

- Allow tuning the rarity/entropy of each word
- Use a better source of word types (Wikipedia categories or DBpedia, maybe)
- Allow inflecting the words ({nouns}, {nouning}) so that the phrase generation is more natural

Installation
------------

To use as a module: `npm install pass-scene`

Then:

```javascript
> var scene = require('pass-scene')
> scene('{noun.time} is the time for all {adj.pert} {noun}s to come to the {noun.act} of their {noun.location}')
'twentieth century is the time for all testaceous drumbeats to come to the cremation of their epicentre'
> scene('{verb}ing {verb}s {noun}s')
'dogfighting unscrews casebooks'
> scene.entropy('{verb}ing {verb}s {noun}s')
43.040113798456446
```

