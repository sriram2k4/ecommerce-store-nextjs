'use client';
import { formatCurrency } from '@/lib/formatters';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';

import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type CheckoutFormProps = {
  product: {
    id: string;
    imagePath: string;
    name: string;
    priceInCents: number;
    description: string;
  };
  clientSecret: string;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export function CheckoutForm({ product, clientSecret }: CheckoutFormProps) {
  return (
    <div className='max-w-5xl w-full mx-auto space-y-8'>
      <div className='flex gap-4 items-center'>
        <div className='relative aspect-video w-1/3 flex-shrink-0'>
          <Image
            src={product.imagePath}
            alt={product.name}
            className='object-cover'
            fill
          />
        </div>
        <div>
          <div className='text-lg'>
            {formatCurrency(product.priceInCents / 100)}
          </div>
          <h1 className='text-2xl font-bold'>{product.name}</h1>
          <div className='line-clamp-3 text-muted-foreground'>
            {product.description}
          </div>
        </div>
      </div>
      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <Form priceInCents={product.priceInCents} productId={product.id} />
      </Elements>
    </div>
  );
}

function Form({
  priceInCents,
  productId,
}: {
  priceInCents: number;
  productId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  return (
    <form>
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          <CardDescription className='text-destructive'>Error</CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentElement />
        </CardContent>
        <CardFooter>
          <Button
            className='w-full'
            size='lg'
            disabled={stripe == null || elements == null}
          >
            Purchase - {formatCurrency(priceInCents / 100)}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
