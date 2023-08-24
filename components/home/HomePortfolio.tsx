"use client";

import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Portfolio } from "@prisma/client";

import Container from "../Container";
import SlidingText from "../framer/SlidingText";
import ScaleBtn from "../framer/ScaleBtn";

interface HomePortfolioProps {
  portfolios: Portfolio[];
}

const HomePortfolio = ({ portfolios }: HomePortfolioProps) => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center">
        <SlidingText text="Portfolio" />
        <div className="w-full columns-2">
          {portfolios.map((portfolio) => (
            <Link href={`/portfolio/${portfolio.id}`} target="_blank">
              <motion.div
                key={portfolio.id}
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
                <Image
                  src={portfolio.thumb}
                  layout="fill"
                  objectFit="cover"
                  className="rounded cursor-pointer hover:opacity-70 transition"
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
