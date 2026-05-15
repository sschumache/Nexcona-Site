'use client';

import { IconTrash } from '@tabler/icons-react';
import React from 'react';

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from '../ui/animated-modal';
import { StrapiImage } from '@/components/ui/strapi-image';
import { useCart } from '@/context/cart-context';
import { formatNumber } from '@/lib/utils';

export default function AddToCartModal({
  onClick,
  ctaText = 'Add to cart',
  buyNowText = 'Buy now',
  locale = 'en',
}: {
  onClick: () => void;
  ctaText?: string;
  buyNowText?: string;
  locale?: string;
}) {
  const { items, updateQuantity, getCartTotal, removeFromCart } = useCart();

  return (
    <Modal>
      <ModalTrigger
        onClick={onClick}
        className="mt-10 w-full rounded-md bg-[#E2E2E2] px-4 py-2 text-sm font-medium text-[#2B2B2B] transition hover:bg-[#2B2B2B] hover:text-white"
      >
        {ctaText}
      </ModalTrigger>

      <ModalBody>
        <ModalContent>
          <h4 className="mb-8 text-center text-lg font-bold text-[#2B2B2B] md:text-2xl">
            Your cart
          </h4>

          {!items.length && (
            <p className="text-center text-[#666666]">
              Your cart is empty. Please purchase something.
            </p>
          )}

          <div className="flex flex-col divide-y divide-[#E2E2E2]">
            {items.map((item, index) => (
              <div
                key={`purchased-item-${index}`}
                className="flex items-center justify-between gap-2 py-4"
              >
                <div className="flex items-center gap-4">
                  <StrapiImage
                    src={item.product?.images?.[0]?.url}
                    alt={item.product.name}
                    width={60}
                    height={60}
                    className="hidden rounded-lg border border-[#E2E2E2] object-cover md:block"
                  />

                  <span className="text-sm font-medium text-[#2B2B2B] md:text-base">
                    {item.product.name}
                  </span>
                </div>

                <div className="flex items-center">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      if (value > 0) {
                        updateQuantity(item.product, value);
                      }
                    }}
                    min="1"
                    step="1"
                    className="mr-4 h-full w-16 rounded-md border border-[#E2E2E2] bg-[#F8F9FA] p-2 text-[#2B2B2B] outline-none transition focus:border-[#003F6B] focus:bg-white"
                    style={{
                      WebkitAppearance: 'none',
                      MozAppearance: 'textfield',
                    }}
                  />

                  <div className="w-20 text-sm font-medium text-[#2B2B2B]">
                    {locale === 'fr' ? '€' : '$'}
                    {formatNumber(item.product.price, locale)}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id)}
                    className="rounded-md p-2 text-[#666666] transition hover:bg-[#E2E2E2] hover:text-[#2B2B2B]"
                    aria-label="Remove item"
                  >
                    <IconTrash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </ModalContent>

        <ModalFooter className="items-center gap-4">
          <div className="text-[#666666]">
            Total{' '}
            <span className="font-bold text-[#2B2B2B]">
              {locale === 'fr' ? '€' : '$'}
              {formatNumber(getCartTotal(), locale)}
            </span>
          </div>

          <button
            disabled={!items.length}
            className="w-28 rounded-md border border-[#E2E2E2] bg-[#E2E2E2] px-2 py-1 text-sm font-medium text-[#2B2B2B] transition hover:bg-[#2B2B2B] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {buyNowText}
          </button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}
