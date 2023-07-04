"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/legacy/image";

import { Portfolio } from "@prisma/client";
import Container from "../Container";
import Button from "../Button";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";
import SlidingText from "../framer/SlidingText";

interface HomePortfolioProps {
  portfolios: Portfolio[];
}

const HomePortfolio = ({ portfolios }: HomePortfolioProps) => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center">
        <SlidingText text="Portfolio" />
        <div className="w-full columns-2">
          {portfolios.map((portfolio, index) => (
            <motion.div
              key={portfolio.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  type: "tween",
                  duration: 1,
                  delay: 0.5,
                },
              }}
              viewport={{ once: false }}
              className="w-full aspect-video relative mb-4"
            >
              <Image
                src={portfolio.thumb}
                layout="fill"
                objectFit="cover"
                className="rounded cursor-pointer hover:opacity-70 transition"
              />
            </motion.div>
          ))}
        </div>
        {/* <Link href="/portfolio">
          <motion.div
            viewport={{ once: false }}
            initial={{ opacity: 0, scale: 0.3 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 50,
              transition: { delay: 0.3, duration: 0.5, type: "tween" },
            }}
            className="flex items-center gap-2"
          >
            All Portfolios
            <HiOutlineArrowRight />
          </motion.div>
        </Link> */}
      </div>
    </Container>
  );
};

export default HomePortfolio;
