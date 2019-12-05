import { withRouter } from 'react-router-dom';

import { MarketplaceTemplate } from '@/components/templates';
import { ProductCard } from '@/components/molecules';
import { useMojoApi } from '@/hooks';

function ServicesPage( { history } ) {
	const [ { done, isError, isLoading, payload } ] = useMojoApi( 'services', { category: '', count: 1000 } );

	if ( isError ) {
		throw new Error( 'API Error. Payload: ' + JSON.stringify( payload ) );
	}

	const renderCallback = ( { item, hasFavorite, toggleFavorite } ) => {
		return (
			<ProductCard
				buttonPrimary={ { href: item.buy_url } }
				buttonSecondary={ {
					onClick: () => {
						history.push( `/marketplace/product/${ item.id }` );
					},
				} }
				id={ item.id }
				imageUrl={ item.images.preview_url }
				isFavorite={ hasFavorite( item.id ) }
				key={ item.id }
				price={ item.prices.single_domain_license }
				title={ item.name }
				toggleFavorite={ () => toggleFavorite( item.id ) }
			/>
		);
	};

	return (
		<MarketplaceTemplate
			isLoading={ ! done || isLoading }
			payload={ payload }
			render={ renderCallback }
			type="services"
		/>
	);
}

export default withRouter( ServicesPage );
