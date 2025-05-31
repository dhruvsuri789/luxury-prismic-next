import { Bounded } from '@/components/Bounded';
import ButtonLink from '@/components/ButtonLink';
import FadeIn from '@/components/FadeIn';
import { formatPrice } from '@/lib/utils';
import { createClient } from '@/prismicio';
import { asText, Content, isFilled } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { FC } from 'react';

/**
 * Props for `ProductFeature`.
 */
export type ProductFeatureProps = SliceComponentProps<Content.ProductFeatureSlice>;

/**
 * Component for "ProductFeature" Slices.
 */
const ProductFeature: FC<ProductFeatureProps> = async ({ slice }) => {
  const client = createClient();
  const fragrance = isFilled.contentRelationship(slice.primary.fragrance)
    ? await client.getByID<Content.FragranceDocument>(slice.primary.fragrance.id)
    : null;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden bg-black py-16 text-white md:py-24"
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
        <FadeIn
          className="translate-y-16 opacity-0 lg:col-span-2 lg:row-span-2"
          vars={{ duration: 1 }}
        >
          <PrismicNextImage field={slice.primary.image} className="h-auto w-full object-cover" />
        </FadeIn>
        <FadeIn
          className="translate-y-16 space-y-6 self-start bg-white/10 p-10 opacity-0 lg:col-start-3 lg:row-start-1"
          vars={{ delay: 0.3 }}
        >
          <h2 className="font-display text-3xl leading-tight font-semibold md:text-4xl">
            {asText(slice.primary.heading)}
          </h2>
          <div className="max-w-lg text-base text-gray-300">
            <PrismicRichText field={slice.primary.description} />
          </div>
        </FadeIn>
        {/* Fragrance */}
        {fragrance && (
          <FadeIn
            className="animate-in relative translate-y-16 self-end bg-white/10 opacity-0 will-change-transform"
            vars={{ duration: 3, delay: 1 }}
          >
            <PrismicNextImage
              field={fragrance.data.bottle_image}
              className="mx-auto -mt-10 w-full -rotate-12 object-cover md:-mt-20"
            />
            <div className="flex justify-between p-10 pt-4">
              <div className="space-y-1">
                <h3 className="font-display text-4xl">{asText(fragrance.data.title)}</h3>
                <p className="mt-2 text-gray-400">Eau de Parfum</p>
                <ButtonLink document={fragrance} variant="Secondary" className="mt-6">
                  Shop Now
                </ButtonLink>
              </div>
              <p className="mt-4 text-gray-100" aria-label="Product Price">
                <span>{formatPrice(fragrance.data.price)}</span>
              </p>
            </div>
          </FadeIn>
        )}
      </div>
    </Bounded>
  );
};

export default ProductFeature;
