import { IconRocket } from '@tabler/icons-react';
import React from 'react';

import { Container } from '../../container';
import { Heading } from '../../elements/heading';
import { Subheading } from '../../elements/subheading';
import { GradientContainer } from '../../gradient-container';
import {
  Card,
  CardDescription,
  CardSkeletonContainer,
  CardTitle,
} from './card';
import { FeatureIconContainer } from './feature-icon-container';
import { SkeletonOne } from './skeletons/first';
import { SkeletonFour } from './skeletons/fourth';
import { SkeletonTwo } from './skeletons/second';
import { SkeletonThree } from './skeletons/third';
import { SkeletonFive } from './skeletons/fifth';
import { SkeletonSix } from './skeletons/sixth';
import { SkeletonSeven } from './skeletons/seventh';
import { SkeletonEight } from './skeletons/eighth';

const wordToNumber: { [key: string]: number } = {
  one: 1,
  two: 2,
  three: 3,
};

function convertWordToNumber(word?: string) {
  if (!word) return null;
  return wordToNumber[word.toLowerCase()] || null;
}

export const Features = ({
  heading,
  sub_heading,
  globe_card,
  ray_card,
  graph_card,
  social_media_card,
  tech_stack_card,
  slider_card,
  accordion_card,
  business_value_card,
}: {
  heading: string;
  sub_heading: string;
  globe_card: any;
  ray_card: any;
  graph_card: any;
  social_media_card: any;
  tech_stack_card: any;
  slider_card: any;
  accordion_card: any;
  business_value_card: any;
}) => {
  return (
    <GradientContainer className="md:my-20">
      <Container className="py-20 max-w-7xl mx-auto relative z-40">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <IconRocket className="h-6 w-6 text-white" />
        </FeatureIconContainer>

        <Heading className="pt-4">{heading}</Heading>
        <Subheading className="max-w-3xl mx-auto">{sub_heading}</Subheading>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-10">
          {globe_card && (
            <Card className={`md:col-span-${convertWordToNumber(globe_card?.span) || '2'}`}>
              <CardTitle>{globe_card.title}</CardTitle>
              <CardDescription>{globe_card.description}</CardDescription>
              <CardSkeletonContainer>
                <SkeletonOne />
              </CardSkeletonContainer>
            </Card>
          )}

          {ray_card && (
            <Card className={`md:col-span-${convertWordToNumber(ray_card?.span) || '1'}`}>
              <CardSkeletonContainer className="max-w-[16rem] mx-auto">
                <SkeletonTwo
                  beforeItems={ray_card?.before_ray_items}
                  afterItems={ray_card?.after_ray_items}
                />
              </CardSkeletonContainer>
              <CardTitle>{ray_card.title}</CardTitle>
              <CardDescription>{ray_card.description}</CardDescription>
            </Card>
          )}

          {graph_card && (
            <Card className={`md:col-span-${convertWordToNumber(graph_card?.span) || '2'}`}>
              <CardSkeletonContainer showGradient={false} className="max-w-[16rem] mx-auto">
                <SkeletonThree />
              </CardSkeletonContainer>
              <CardTitle>{graph_card.title}</CardTitle>
              <CardDescription>{graph_card.description}</CardDescription>
            </Card>
          )}

          {social_media_card && (
            <Card className={`md:col-span-${convertWordToNumber(social_media_card?.span) || '1'}`}>
              <CardSkeletonContainer showGradient={false}>
                <SkeletonFour logos={social_media_card?.logos} />
              </CardSkeletonContainer>
              <CardTitle>{social_media_card.title}</CardTitle>
              <CardDescription>{social_media_card.description}</CardDescription>
            </Card>
          )}

          {tech_stack_card && (
            <Card className={`md:col-span-${convertWordToNumber(tech_stack_card?.span) || '1'}`}>
              <CardSkeletonContainer showGradient={false}>
                <SkeletonFive logos={tech_stack_card?.logos} />
              </CardSkeletonContainer>
              <CardTitle>{tech_stack_card.title}</CardTitle>
              <CardDescription>{tech_stack_card.description}</CardDescription>
            </Card>
          )}

          {slider_card && (
            <Card className={`md:col-span-${convertWordToNumber(slider_card?.span) || '3'}`}>
              <CardSkeletonContainer showGradient={false} className="h-[24rem]">
                <SkeletonSix items={slider_card?.items} />
              </CardSkeletonContainer>
              <CardTitle>{slider_card.title}</CardTitle>
              <CardDescription>{slider_card.description}</CardDescription>
            </Card>
          )}

          {accordion_card && (
            <Card className={`md:col-span-${convertWordToNumber(accordion_card?.span) || '2'}`}>
              <CardSkeletonContainer showGradient={false} className="h-auto min-h-[20rem]">
                <SkeletonSeven items={accordion_card?.items} />
              </CardSkeletonContainer>
              <CardTitle>{accordion_card.title}</CardTitle>
              <CardDescription>{accordion_card.description}</CardDescription>
            </Card>
          )}

          {business_value_card && (
            <Card className={`md:col-span-${convertWordToNumber(business_value_card?.span) || '1'}`}>
              <CardSkeletonContainer showGradient={false}>
                <SkeletonEight items={business_value_card?.items} />
              </CardSkeletonContainer>
              <CardTitle>{business_value_card.title}</CardTitle>
              <CardDescription>{business_value_card.description}</CardDescription>
            </Card>
          )}
        </div>
      </Container>
    </GradientContainer>
  );
};