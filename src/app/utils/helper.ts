/**
 * An enumerator for the DIRECTION of item to pluck from an Array mainly FIRST or LAST
 */
enum DIRECTION {
  FRONT,
  END,
}

/**
 *
 * @param inputArray input Array of strings
 * @param position  the position to pluck
 * @param defaultValue a default value to return when position of the array does not exist
 */
export function pluck(
  inputArray: string[],
  position: DIRECTION = 0,
  defaultValue: any = undefined,
): any {
  return inputArray && inputArray.length
    ? inputArray[position === DIRECTION.FRONT ? 0 : inputArray.length - 1]
    : defaultValue;
}

/**
 * Extract the name of a query request or mutation using the query passed to the grapqql server
 * @param operation The request operation object from the network request object
 * Returns a string or null if not avaialable and in some cases a null if the request object has no query passed
 */
export function extractOperationName(operation: any): string {
  const operate =
    operation &&
    operation.request &&
    operation.request.operation &&
    operation.request.operation.query
      ? pluck(operation.request.operation.query.split('(')) // pluck the first item from the array after the query is split using '(' as teh delimter
      : null;
  if (!operate) return 'Query'; // return a constant response 'Query' if the when the query was split, there was no item(s) in the array
  return pluck(operate.split(' '), DIRECTION.END, ''); // pluck the last item from the 'operate' array, this will definitely be the name of the operation form the query passed to the graphql server
}
