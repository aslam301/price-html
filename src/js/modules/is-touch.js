/**
 *  Internal dependencies.
 */
import { $bodyTag } from '../utils/globals';
import className from '../utils/constant-names';

$bodyTag.classList.toggle(className.IsTouch, 'ontouchstart' in window);
