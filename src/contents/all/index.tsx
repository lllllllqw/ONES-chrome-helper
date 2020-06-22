import './style.scss';

import { showCustomApi } from './custom_api';
import { withVideoPreview } from './video_preview';
import { run as runOtherScript } from './other_script';

showCustomApi();
withVideoPreview();
runOtherScript();
