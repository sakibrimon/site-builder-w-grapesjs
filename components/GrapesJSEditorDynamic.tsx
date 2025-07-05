"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const GrapesEditor = dynamic(() => import('../src/components/GrapesEditor'), { ssr: false });

const GrapesJSEditorDynamic = () => {
  return <GrapesEditor />;
};

export default GrapesJSEditorDynamic;
