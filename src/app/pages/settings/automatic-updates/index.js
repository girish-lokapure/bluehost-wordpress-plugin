/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import SettingsGroup from '../settings-group';
import SettingsToggle from '../settings-toggle';

const i18n = 'bluehost-wordpress-plugin';

const AutomaticUpdates = ({ core, themes, plugins, toggleSetting }) => {
	return (
		<div className="settings-section automatic-updates pure-u-1 pure-u-lg-3-8">
			<h2>{__( 'Automatic Updates', i18n )}</h2>
			<SettingsGroup>
				<SettingsToggle label={__( 'WordPress Core', i18n )} checked={core} onChange={() => toggleSetting( 'autoUpdatesMajorCore' )} />
				<SettingsToggle label={__( 'Themes', i18n )} checked={themes} onChange={() => toggleSetting( 'autoUpdatesThemes' )} />
				<SettingsToggle label={__( 'Plugins', i18n )} checked={plugins} onChange={() => toggleSetting( 'autoUpdatesPlugins' )} />
			</SettingsGroup>
		</div>
	);
}

export default compose(
	withSelect( select => ({
		core: select( 'bluehost/plugin' ).getSetting( 'autoUpdatesMajorCore' ),
		themes: select( 'bluehost/plugin' ).getSetting( 'autoUpdatesThemes' ),
		plugins: select( 'bluehost/plugin' ).getSetting( 'autoUpdatesPlugins' ),
	})),
	withDispatch( dispatch => ({
		toggleSetting: dispatch( 'bluehost/plugin' ).toggleSetting,
	}))
)(AutomaticUpdates);
