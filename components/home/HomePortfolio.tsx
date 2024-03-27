"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import Container from "../Container";
import SlidingText from "../framer/SlidingText";
import ScaleBtn from "../framer/ScaleBtn";
import ImageWithPlaceholder from "../ImageWithPlaceholder";
import { PortfolioWithBlurData } from "@/types";

interface HomePortfolioProps {
  portfolios: PortfolioWithBlurData[];
}

const HomePortfolio = ({ portfolios }: HomePortfolioProps) => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center">
        <SlidingText text="Portfolio" />
        <div className="w-full columns-2">
          {portfolios.map((portfolio) => (
            <Link
              href={`/portfolio/${portfolio.id}`}
              target="_blank"
              key={portfolio.id}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "tween",
                    duration: 1,
                    delay: 0.2,
                  },
                }}
                viewport={{ once: true }}
                className="w-full aspect-video relative mb-4"
              >
                <ImageWithPlaceholder
                  blurData={portfolio.blurData}
                  image={portfolio.thumb}
                />
              </motion.div>
            </Link>
          ))}
        </div>
        <Link href="/portfolio">
          <ScaleBtn text="더 보기" />
        </Link>
      </div>
    </Container>
  );
};

export default HomePortfolio;
