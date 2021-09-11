import nearestColor from 'nearest-color';
import colorNamesList from 'color-name-list/dist/colornames.bestof.esm';

/**
 * Prepare the color name list and index it using nearest-color.
 * The exported function can be used to find the nearest color to a given hex value.
 */
const colors = colorNamesList.reduce((o, { name, hex }) => Object.assign(o, { [name]: hex }), {});
const nearest = nearestColor.from(colors);

export { nearest }
