/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('info-cursor', require('./info-cursor.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
			{{> info-cursor @root}}
		</hbs>`,
  {},
);
