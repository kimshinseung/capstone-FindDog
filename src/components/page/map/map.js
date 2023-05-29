/**
 * ./src/components/page/map.js
 */

import { NavLink } from 'react-router-dom';
import "./map.scss";
import React, { useEffect, useState } from "react";
import { shelters, hospitals } from "./data";
import areas from "./seoulData.js"

import '../../../style/style.css';
import { HospitalMap } from '../Pages';


export default function MapPage() {
	return <>
		<NavLink to={"/map/hospital"}>주변 병원 및 보호소</NavLink>
		<NavLink to={"/map/seoul"}>주변 실종동물</NavLink>
		<HospitalMap/>
	</>
}
