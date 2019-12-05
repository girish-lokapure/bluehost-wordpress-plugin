/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { Dashicon } from '@wordpress/components';

/**
 * Internal dependencies
 */
import {
	AppHeading,
} from '@/components/atoms';
import './style.scss';

const RowIcon = ( { icon, iconSize } ) => {
	if ( 'string' === typeof icon ) {
		return (
			<Dashicon icon={ icon ? icon : '' } size={ iconSize } />
		);
	}

	return icon;
};

const ContentSectionRow = ( { icon, iconSize, title, desc, className = '', children, ...props } ) => {
	return (
		<div className={ classNames( {
			'content-list-row': true,
			'pure-g': true,
			[ className ]: className.length,
		} ) }>
			<div className="pure-u-1 pure-u-sm-1-2 content-list-row__details">
				<div className="content-list-row__top">
					<RowIcon icon={ icon } iconSize={ iconSize } />
					<AppHeading level="h3" size={ 4 } className="content-list-row__title">{ title }</AppHeading>
				</div>
				<p>{ desc }</p>
			</div>
			<div className="pure-u-1 pure-u-sm-1-2 content-list-row__action">{ children }</div>
		</div>
	);
};

export default ContentSectionRow;
