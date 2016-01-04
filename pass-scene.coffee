data = require './data.json'
# Data derived from Princeton WordNet, available here: https://wordnet.princeton.edu/

words = {}
for kind, kindwords of data
  [pos, domain] = kind.split('.')
  posdata = (words[pos] ||= {count: 0, domains: {}})
  domaindata = (posdata.domains[domain] ||= {})
  domaindata.words = kindwords
  domaindata.count = kindwords.length
  posdata.count += domaindata.count


randKind = (pos, domain) ->
  domaindata = words[pos].domains[domain]
  domaindata.words[Math.floor Math.random()*domaindata.count]

randPos = (pos) ->
  num = Math.floor Math.random() * words[pos].count
  for domain, domaindata of words[pos].domains
    if num < domaindata.count
      return domaindata.words[num]
    else
      num -= domaindata.count

randOf = (kind) ->
  [pos, domain] = kind.split('.')
  return unless pos
  if domain then randKind(pos, domain) else randPos(pos)

entropyOf = (kind) ->
  [pos, domain] = kind.split('.')
  return unless pos
  if domain
    Math.log2 words[pos]?.domains?[domain]?.count
  else
    Math.log2 words[pos]?.count

tagRE = /{(.*?)}/g

entropy = (str) ->
  bits = 0
  for match in str.match(tagRE) or []
    match = match.replace (tagRE), '$1' # str.match doesn't support groups, so we re-replace
    matchBits = entropyOf(match) or 0
    bits += matchBits
  bits

tmpl = (str) -> str.replace tagRE, (match, tag) -> randOf tag

tmpl.entropy = entropy
tmpl.kinds = (k for k of data).sort()

module.exports = tmpl
