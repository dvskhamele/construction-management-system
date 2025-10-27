
'use client';

import React from 'react';
import Head from 'next/head';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>About Us - BuildMate</title>
        <meta name="description" content="Learn more about BuildMate, our mission, vision, and how we help construction businesses thrive." />
        <meta property="og:title" content="About Us - BuildMate" />
        <meta property="og:description" content="Learn more about BuildMate, our mission, vision, and how we help construction businesses thrive." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/about" />
      </Head>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          About Us
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to BuildMate, your trusted partner in construction management. Our mission is to empower construction businesses with innovative, easy-to-use tools that streamline operations, enhance efficiency, and drive profitability.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Founded on the principles of reliability and forward-thinking technology, BuildMate is designed to address the unique challenges faced by the construction industry. From small contractors to large enterprises, we provide comprehensive solutions that cover every aspect of project management, from initial planning and resource allocation to financial tracking and site safety.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          We believe in the power of technology to transform traditional industries. Our platform integrates cutting-edge features with a user-friendly interface, ensuring that you can focus on what you do best: building.
        </p>
        <p className="text-lg text-gray-700">
          Join the growing community of construction professionals who are building smarter, not harder, with BuildMate.
        </p>
      </div>
    </div>
  );
}
