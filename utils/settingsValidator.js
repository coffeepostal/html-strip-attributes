function validateSettings(config) {
  if (!Array.isArray(config.excludedTags)) {
    throw new Error('htmlAttributeStripper.excludedTags must be an array of strings.');
  }

  if (!Array.isArray(config.stripOnlyAttributes)) {
    throw new Error('htmlAttributeStripper.stripOnlyAttributes must be an array of strings.');
  }

  if (typeof config.ignoredAttributes !== 'object' || config.ignoredAttributes === null) {
    throw new Error('htmlAttributeStripper.ignoredAttributes must be an object.');
  }

  for (const [tag, value] of Object.entries(config.ignoredAttributes)) {
    if (!Array.isArray(value)) {
      throw new Error(`ignoredAttributes["${tag}"] must be an array of strings.`);
    }
  }
}

module.exports = { validateSettings };