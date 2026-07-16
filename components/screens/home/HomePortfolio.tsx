"use client";

import React from "react";
import Link from "next/link";
import { Portfolio } from "@prisma/client";
import { motion } from "framer-motion";

import Container from "../../Container";
import SlidingText from "../../framer/SlidingText";
import ScaleBtn from "../../framer/ScaleBtn";
import Image from "next/legacy/image";

interface HomePortfolioProps {
  portfolios: Portfolio[];
}

const HomePortfolio = ({ portfolios }: HomePortfolioProps) => {
  return (
    <Container>
      <div className="flex flex-col items-center">
        <h2 className="mb-8 sm:mb-10 md:mb-12 lg:mb-14">
          <SlidingText text="Portfolio" />
        </h2>
        <div className="w-full flex flex-wrap gap-4">
          {portfolios.map((portfolio) => (
            <Link
              href={`/portfolio/${portfolio.id}`}
              target="_blank"
              key={portfolio.id}
              className="w-[calc(50%-8px)]"
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
                className="w-full aspect-video relative"
              >
                <Image
                  src={portfolio.thumb}
                  alt="포트폴리오 썸네일"
                  layout="fill"
                  objectFit="cover"
                  sizes="50w"
                  className="rounded cursor-pointer hover:opacity-70 transition"
                  blurDataURL={
                    portfolio.blurThumb
                      ? portfolio.blurThumb
                      : "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
                  }
                  placeholder="blur"
                />
              </motion.div>
            </Link>
          ))}
        </div>
        <Link href="/portfolio" className="mt-10 sm:mt-14 md:mt-16 lg:mt-20">
          <ScaleBtn text="더 보기" />
        </Link>
      </div>
    </Container>
  );
};

export default HomePortfolio;
