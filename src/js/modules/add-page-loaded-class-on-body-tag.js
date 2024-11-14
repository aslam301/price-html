/**
 *  Internal dependencies.
 */
import { $bodyTag } from '../utils/globals';
import className from '../utils/constant-names';

window.onload = () => $bodyTag.classList.add(className.PageLoaded);
