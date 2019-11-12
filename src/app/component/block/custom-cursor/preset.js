/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('custom-cursor', require('./custom-cursor.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
			{{> custom-cursor @root}}
		</hbs>`,
  {},
);
