interface Accessible {
  [propName: string]: Accessible | any
}

/**
 * Returns a deep copy of value at the given path inside the given object.
 *
 * @param obj   Object to be destructuralized
 * @param path  Path to be used to access the value
 * @param sep   Separator used in the path (by default dot - `.`)
 *
 * @throws {Error} When on the path is not defined value or there
 * is an unexpected type of object
 */
export const accessProperty = (
  obj: Accessible,
  path: string,
  sep: string = "."
) => {
  const pathSteps = path.split(sep);
  let current = obj;
  pathSteps.forEach((step, idx) => {
    if (Array.isArray(current)) {
      throw new Error(`Can't access '${step}' at position (${idx}) in '${path}' - arrays are not supported`);
    } else if (!current || Object.keys(current).length === 0) {
      throw new Error(`Can't access '${step}' at position (${idx}) in '${path}' - does not exist`);
    } else if (typeof current === 'object') {
      current = current[step];
    } else {
      throw new Error(`Can't access '${step}' at position (${idx}) in '${path}' - unexpected type (${typeof current})`);
    }
  });

  if (current === undefined || current === null) {
    return current;
  }

  return JSON.parse(JSON.stringify(current));
}
