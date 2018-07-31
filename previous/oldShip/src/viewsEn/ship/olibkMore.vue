<template>
	<section>
		<div class="wl_yybg"></div>
	    <div class="inner">
	      <div class="wl_yyxq">
	        <ul class="wl_yyxq_l">
	          <li><a class="wl_yyxq_tab" :class="num == 0 ? 'active' : ''">Joint War Committee JWLA/022 </a></li>
	          <li><a class="wl_yyxq_tab" :class="num == 1 ? 'active' : ''">Wind/Sea</a></li>
	          <li><a class="wl_yyxq_tab" :class="num == 3 ? 'active' : ''">Vessel Type</a></li>
	          <li><a class="wl_yyxq_tab" :class="num == 4 ? 'active' : ''">WS points</a></li>
	          <li><a class="wl_yyxq_tab" :class="num == 5 ? 'active' : ''">Flat Rate</a></li>
	          <li><a class="wl_yyxq_tab" :class="num == 6 ? 'active' : ''">Demurrage</a></li>
	          <li><a class="wl_yyxq_tab" :class="num == 7 ? 'active' : ''">Routes</a></li>
	          <li><a class="wl_yyxq_tab" :class="num == 8 ? 'active' : ''">World Crude Oil Map</a></li>
	          <li><a href="javascript:;" class="wl_yyxq_qt" @click="getBk()">Others</a></li>
	        </ul>
	        <div class="wl_yyxq_r">
	        	<div class="tab_detail" :class="num == 0 ? 'show' : ''">
	              <h2>Joint War Committee JWLA/022 </h2>
	               <span>
	                  <p>Joint War Committee    JWLA/022    10th December 2015</p>
	                  <p>Hull War, Piracy, Terrorism and Related Perils Listed Areas</p>
	                  <p>The Joint War Committee has recently reviewed the Listed Areas, last altered 12th June 2013, and
	        has agreed the following changes which are incorporated in the new list as attached.</p>
	                  <p>Amended:<br/>Indian Ocean / Arabian Sea / Gulf of Aden / Gulf of Oman / Southern Red Sea</p>
	                  <p>Deleted:<br/>Bahrain, NE Borneo, Sulu Archipelago</p>
	                  <p>The application of this list on individual contracts will be a matter for specific negotiation.<br/>
	        Neil Roberts<br/>
	        Secretary</p>
	        		<p>JWC Hull War, Piracy, Terrorism and Related Perils Listed Areas (10th December 2015) <br/>
	        Africa<br/>
	        Benin<br/>
	        Eritrea, but only South of 15º N</p>
	        <p>Gulf of Guinea, but only the waters of the Togolese, Beninese and Nigerian Exclusive Economic Zones north of Latitude 3° N<br/>
			Libya<br/>
			Nigeria<br/>
			Somalia<br/>
			Togo</p>
					<p>Indian Ocean / Arabian Sea / Gulf of Aden / Gulf of Oman / Southern Red Sea<br/>
			Waters as defined overleaf<br/>
			
			Asia<br/>
			Pakistan<br/>
			
			Indonesia<br/>
			The Port of Jakarta<br/>
			
			Middle East<br/>
			Iran<br/>
			Iraq, including all Iraqi offshore oil terminals<br/>
			Israel<br/>
			Lebanon<br/>
			Saudi Arabia excluding transit<br/>
			Syria<br/>
			Yemen<br/>
			
			South America<br/>
			Venezuela, including all offshore installations in the Venezuelan EEZ<br/>
			Definitions:<br/>
			Named Countries shall include their coastal waters up to 12 nautical miles offshore, unless specifically varied above.<br/>
			Named Ports shall include all facilities/terminals within areas controlled by the relevant port authority/ies (or as may be more precisely defined by Insurers) including offshore terminals/facilities, and all waters within 12 nautical miles of such but not exceeding 12 nautical miles offshore unless specifically stated.<br/>
			Indian Ocean / Arabian Sea / Gulf of Aden / Gulf of Oman / Southern Red Sea<br/>
			The waters enclosed by the following boundaries:<br/>
			a) On the north-west, by the Red Sea, south of Latitude 15° N<br/>
			b) on the west of the Gulf of Oman by Longitude 58° E<br/>
			c) on the east, Longitude 65° E<br/>
			d) and on the south, Latitude 12° S<br/>
			excepting coastal waters of adjoining territories up to 12 nautical miles offshore unless otherwise provided.</p>
	         	</span> 
	            </div>
	            <div class="tab_detail" :class="num == 1 ? 'show' : ''">
	               <h2>Content of Comparison Table for Wind and Wave Level</h2> 
	               <h2>Wind level</h2>
	               <span>
	               		<table border="1" width="100%" style="width: 100%" id="tableOne">
	               			<tbody>
	               				<tr style="font-weight: bold; text-align: center;height: 20px;">
	               					<td width="20%">Level</td>
	               					<td colspan="2">Description</td>
	               					<td width="20%">Wind Speed（m/s）</td>
	               					<td width="20%">Wind Speed（kt）</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">0</td>
	               					<td width="20%">Calm</td>
	               					<td width="20%">无风</td>
	               					<td width="20%">0-0.2</td>
	               					<td width="20%"><1</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">1</td>
	               					<td width="20%">Light</td>
	               					<td width="20%">软风</td>
	               					<td width="20%">0.3-1.5</td>
	               					<td width="20%">1-3</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">2</td>
	               					<td width="20%">Light breeze</td>
	               					<td width="20%">轻风</td>
	               					<td width="20%">1.6-3.3</td>
	               					<td width="20%">4-6</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">3</td>
	               					<td width="20%">Gentl breeze</td>
	               					<td width="20%">微风</td>
	               					<td width="20%">3.4-5.4</td>
	               					<td width="20%">7-10</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">4</td>
	               					<td width="20%">Moderate breeze</td>
	               					<td width="20%">和风</td>
	               					<td width="20%">5.4-7.9</td>
	               					<td width="20%">11-16</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">5</td>
	               					<td width="20%">Fresh breeze</td>
	               					<td width="20%">清风</td>
	               					<td width="20%">8.0-11.7</td>
	               					<td width="20%">17-21</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">6</td>
	               					<td width="20%">Strong breeze</td>
	               					<td width="20%">强风</td>
	               					<td width="20%">11.8-13.8</td>
	               					<td width="20%">22-27</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">7</td>
	               					<td width="20%">Near gale</td>
	               					<td width="20%">疾风</td>
	               					<td width="20%">13.9-17.1</td>
	               					<td width="20%">28-33</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">8</td>
	               					<td width="20%">Gale</td>
	               					<td width="20%">大风</td>
	               					<td width="20%">17.2-20.7</td>
	               					<td width="20%">34-40</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">9</td>
	               					<td width="20%">Strong gale</td>
	               					<td width="20%">烈风</td>
	               					<td width="20%">20.8-24.4</td>
	               					<td width="20%">41-47</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">10</td>
	               					<td width="20%">Storm</td>
	               					<td width="20%">狂风</td>
	               					<td width="20%">24.5-28.4</td>
	               					<td width="20%">48-55</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">11</td>
	               					<td width="20%">Violent storm</td>
	               					<td width="20%">暴风</td>
	               					<td width="20%">28.5-32.6</td>
	               					<td width="20%">56-63</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">12</td>
	               					<td width="20%">Hurricane</td>
	               					<td width="20%">飓风</td>
	               					<td width="20%">>32.7</td>
	               					<td width="20%">>64</td>
	               				</tr>
	               			</tbody>
	               		</table>
	               		<h2>Waves</h2>
	               		<table border="1" width="100%" style="width: 100%" id="tableOne">
	               			<tbody>
	               				<tr style="font-weight: bold; text-align: center;height: 20px;">
	               					<td width="20%">Level</td>
	               					<td colspan="2">Description</td>
	               					<td width="20%">Height （m）</td>
	               					
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">0</td>
	               					<td width="20%">Calm sea glassy</td>
	               					<td width="20%">海面如镜</td>
	               					<td width="20%">0</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">1</td>
	               					<td width="20%">Rippled sea calm</td>
	               					<td width="20%">微波</td>
	               					<td width="20%">0.1-0.5</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">2</td>
	               					<td  width="20%">Smooth sea</td>
	               					<td width="20%">小波</td>
	               					<td width="20%">0.1-0.5</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">3</td>
	               					<td width="20%">Slight sea</td>
	               					<td width="20%">轻浪</td>
	               					<td width="20%">1.5-1.25</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">4</td>
	               					<td width="20%">Moderate sea</td>
	               					<td width="20%">中浪</td>
	               					<td width="20%">1.25-2.5</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">5</td>
	               					<td width="20%">Rough sea</td>
	               					<td width="20%">大浪</td>
	               					<td width="20%">2.5-4.0</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">6</td>
	               					<td width="20%">Very rough sea</td>
	               					<td width="20%">巨浪</td>
	               					<td width="20%">4.0-6.0</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">7</td>
	               					<td width="20%">High sea</td>
	               					<td width="20%">狂浪</td>
	               					<td width="20%">6.0-9.0</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">8</td>
	               					<td width="20%">Very high sea</td>
	               					<td width="20%">怒涛</td>
	               					<td width="20%">9.0-14.0</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">9</td>
	               					<td width="20%">Confused sea</td>
	               					<td width="20%">凶涛</td>
	               					<td width="20%">>14.0</td>
	               				</tr>
	               			</tbody>
	               		</table>
	               </span>
	               
	            </div>
	        	<div class="tab_detail" :class="num == 3 ? 'show' : ''">
	               <h2>Vessel Type</h2>
	               <span>
	               		<p>Ultra-Large Crude Carrier: Total deadweight of over 320,000 tons</p>
						<p>Very Large Crude Carrier: Total deadweight of 200,000~320,000 tons</p>
						<p>Suezmax: Total deadweight of 120,000-200,000 tons</p>
						<p>Aframax: Total deadweight of 80,000~10,000 tons</p>
						<p>Panamax: Total deadweight of 60,000~ 80,000 tons</p>
						<p>MR Size: Total deadweight of 10,000~ 60,000 tons</p>
	               </span>
	        	</div>
	        	<div class="tab_detail" :class="num == 4 ? 'show' : ''">
	               <h2>WS points</h2>
	               <span>
	               		<p style="text-indent: 32px;">WORLDSCALE is in full name of the New Worldwide Tanker Nominal Freight Scale, and abbreviated as WS. In the international oil shipping market, prevailing guidelines have been established for the formulation and calculation of tanker freight rates. It is clearly stated in the charter contract that the shipowner and the charterer comply with the specific regulations on freight of WORLD SCALE.</p>
						<p>Total Freight = Basic Rate × Freight Ton × WS Points</p>
						<p>The principle of the assumption of other expenses than the total freight is stipulated as follows:</p>
						<p>-- It is stipulated that the port cargo tax, freight tax, helicopter expenses, etc. shall be borne by the charterers.</p>
						     <p> -- It is stipulated that the cost levied against the ship is borne by the shipowner.</p>
	               </span> 
	        	</div>
	        	<div class="tab_detail" :class="num == 5 ? 'show' : ''">
	               <h2>Flat Rate</h2>
	               <span>
	               	<p style="text-indent: 32px;">The 75,000-ton oil tanker is used as the standard ship type to calculate the total transportation cost of the shipowner performing navigation along a route, and the freight rate in USD/ton for this particular route.</p>
	               	<p style="text-indent: 32px;">According to the constant changes in the cost of marine fuel oil cost and port charges at loading/unloading ports, the manuals for the rates are published externally, and subject to yearly adjustment. If the rate is adjusted for major changes in the middle of the year, it will be issued in the form of circular.</p>
	               </span>  
	        	</div>
	        	<div class="tab_detail" :class="num == 6 ? 'show' : ''">
	               <h2>Demurrage</h2> 
	               <span>
	               	<p style="text-indent: 32px;">The demurrage is defined as the cost of the overdue time of the part paid to shipowner when the payment for permissible loading and unloading time agreed upon by the charterer is exceeded. The permissible loading and unloading time refers to the time that the shipowner provides to the charterer for loading and unloading ship without additional charges based on the charter contract. The actual loading and unloading time in actual chartering negotiation is usually 120hrs for VLCCs and 96 hours for Suez/Aframax tankers.</p>
	               </span>
	        	</div>
	        	<div class="tab_detail" :class="num == 7 ? 'show' : ''">
	               <h2>Routes</h2>
	               <span>
	               		<p style="text-indent:32px;line-height:150%">
	               			<span style="font-size: 16px;line-height: 150%">Due to the differences in the origin of crude oil in the world and the consumer territories, the eight major oil shipping routes in the world are as follows:<img src="http://sinochem-b2b-dev.oss-cn-beijing.aliyuncs.com/upload/20171218/74481513581355600.jpg" style="width: 699px; height: 507px;"></span>
	               		</p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">(1) Channel 1: Strait of Hormuz</span></p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">The Strait of Hormuz, which belongs to Iran, is the most important crude oil “throat” in the world, and is hailed as the “lifeline on the sea” by the West. The crude oil from Saudi Arabia, the United Arab Emirates, Qatar, Iran, and Iraq will all be delivered to international buyers through this strait, with the majority going to Asia.</span>
	               		</p><p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">The Strait of Hormuz has another advantage: The oil tanker with the largest volume in the world can calmly pass.</span></p><p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">It is relying on such a strategically important crude oil trade “throat” artery that Iran has an indispensable position in the international community.</span></p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">(2) Channel 2: Strait of Malacca</span></p><p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">The Strait of Malacca is the shortest waterway connecting the Indian Ocean, the South China Sea and the Pacific Ocean. It is now under the joint jurisdiction of Singapore, Malaysia and Indonesia. The Middle East crude oil passing through here is mainly destined for China, Japan and Indonesia. In particular for Japan, this strait is called Japan's Marine Lifeline.</span></p><p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">Contrary to the Strait of Hormuz, the Strait of Malacca is one of the narrowest seaway in the world, and its narrowest point is only 1.7 miles wide, creating a natural bottleneck for transportation. At present, it has become one of the latest active areas for pirates.</span></p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">(3) Channel 3: Cape of Good Hope</span></p><p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">The Cape of Good Hope in the southwestern end of Africa is also an important crude oil trading channel. At present, it is the main channel for shipping the West African crude oil to Asia.</span></p><p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">The position of the Cape of Good Hope lies in the fact that if major shipping routes e.g. the Suez Canal or the Bab el-Mandab are closed, it will become a secondary crude oil pipeline. However, once the tanker changes course to the Cape of Good Hope, the cost of transportation will increase significantly because the oil tanker from Saudi Arabia to the United States must sail an additional 2700 miles.</span></p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">(4) Channel 4: Bab el-Mandab</span></p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">The narrowest point of the Bab el-Mandab, which connects the Red Sea and the Gulf of Aden and eventually leads to the Indian Ocean, is only 18 miles wide. If it is closed or in an unstable state, the international oil tanker will be forced to change its route to the Cape of Good Hope in southern Africa.</span></p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">In the view of the US Energy Information Administration (EIA), it is vitally important that a large number of oil tankers on the Suez Canal must cross the Bab el-Mandab. Therefore, the closure of this strait will lead to more serious consequences.</span></p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">(5) Channel 5: Danish Straits</span></p>
	               		<p style="text-indent:24px;line-height:150%"><span style="font-size: 16px;line-height: 150%">&nbsp;</span><span style="font-size: 16px;line-height: 150%">The Danish Straits, located between the Danish territory of Greenland and Iceland, is one of the safest crude oil seaway in the world. The strait connects the Baltic Sea to the east and the North Sea to the west.</span></p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">Although Europe's current relations with Russia are very tense, especially in the Baltic countries, cargo ships e.g. oil tankers have not been threatened by regional security. A small portion of oil tankers from Norway and the United Kingdom also travel from the Danish Strait to the Baltic countries. This also means that if Russia blocks the Danish Strait, then it would be tantamount to blocking its crude oil trade export channel.</span></p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">(6) Channel 6: Suez Canal</span></p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">The Suez Canal runs through the Isthmus of Suez, Egypt, connecting the Red Sea and the Mediterranean Sea. Most of the crude oil passing through here is sold to Europe and North America.</span></p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">According to the EIA record, the Suez Canal was expanded in 2010 to allow about 60% of global oil tankers to pass the canal more efficiently. The step-down of former Egyptian President Hosni Mubarak in 2011 and the resulting turmoil have failed to affect international oil tankers passing through the canal. However, the shipping security of the Suez Canal is still international</span></p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">&nbsp;</span><span style="font-size: 16px;line-height: 150%">(7) Channel 7: Bosporus Straits</span></p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">The Bosphorus Straits is a narrow waterway that connects the Black Sea and the Mediterranean Sea. It separates the Asian and European parts of Istanbul, Turkey. The narrowest point of the strait is only 0.5 mile wide, and an average of 48,000 ships travel across this water area every year.</span></p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">According to the EIA record, Russia has started to slowly transfer its crude oil exports to the Baltic Sea. Azerbaijan and Kazakhstan further increased the volume of traffic through the Bosporus Straits.</span></p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">(8) Channel 8: Panama Canal</span></p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">The Panama Canal connects the Pacific and the Caribbean and eventually flows into the Atlantic Ocean.</span></p>
	               		<p style="text-indent:32px;line-height:150%">However, since its completion, the utility of the Panama Canal has gradually diminished, with only 110 feet at the narrowest part of the waterway. Larger VLCC cannot pass through here. On June 26, 2016, the Panama Canal ushered in a new stage - the ship lock was completed expansion and navigable, so that large oil tankers can pass through here.</p>
	               </span> 
	        	</div>
	        	<div class="tab_detail" :class="num == 8 ? 'show' : ''">
	               <h2>World Crude Oil Map</h2>
	               <span>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size:16px;line-height:150%">The world’s petroleum resources are concentrated in places e.g. the Middle East, Central and South America, and North America, and there has been little change in other regions except for proven reserves in Central and South America that have increased significantly in the last decade. As of the end of 2016, the world's proven reserves were 1.7 trillion barrels, and the Middle East’s reserves accounted for nearly half of the country’s total (47.7%). The rankings of proven reserves below the Middle East are: Central and South America (19.2%), North America (13.3%), Europe and Eurasia (9.5%), Africa (7.5%), and Asia Pacific (2.8%).</span></p>
	               		<p style="text-indent: 32px;">The 15 countries with the largest proven reserves of oil in the world account for 92.9% of global reserves, followed by: Venezuela (17.63%), Saudi Arabia (15.61%), Canada (10.05%), Iran (9.28%), Iraq (8.96%), Russia (6.41%), Kuwait (5.95%), UAE (5.73%), Libya (2.83%), United States (2.81%), Nigeria (2.17%), Kazakhstan (1.76%), China (1.5%), Qatar ( 1.48%) and Brazil (0.74%).</p>
	               		<p style="text-align: center;">Table 1 Proved Oil Reserves and Proportions</p>
	               		<table border="1" width="100%" style="width: 100%" id="tableOne">
	               			<tbody>
	               				<tr style="font-weight: bold; text-align: center;height: 20px;">
	               					<td width="20%">No. </td>
	               					<td width="20%">Country</td>
	               					<td width="20%">Proven reserves (Unit: billion barrels)</td>
	               					<td width="20%">Proportion</td>
	               					
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">1</td>
	               					<td width="20%">Venezuela</td>
	               					<td width="20%">300.9</td>
	               					<td width="20%">17.63%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">2</td>
	               					<td width="20%">Saudi Arabia</td>
	               					<td width="20%">266.5</td>
	               					<td width="20%">15.61%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">3</td>
	               					<td  width="20%">Canada</td>
	               					<td width="20%">171.5</td>
	               					<td width="20%">10.05%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">4</td>
	               					<td width="20%">Iran</td>
	               					<td width="20%">158.4</td>
	               					<td width="20%">9.28%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">5</td>
	               					<td width="20%"> Iraq</td>
	               					<td width="20%">153</td>
	               					<td width="20%">8.96%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">6</td>
	               					<td width="20%">Russia</td>
	               					<td width="20%">109.5</td>
	               					<td width="20%">6.41%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">7</td>
	               					<td width="20%">Kuwait</td>
	               					<td width="20%">101.5</td>
	               					<td width="20%">5.95%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">8</td>
	               					<td width="20%">United Arab Emirates</td>
	               					<td width="20%">97.8</td>
	               					<td width="20%">5.73%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">9</td>
	               					<td width="20%">Libya</td>
	               					<td width="20%">48.4</td>
	               					<td width="20%">2.83%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">10</td>
	               					<td width="20%">US</td>
	               					<td width="20%">48</td>
	               					<td width="20%">2.81%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">11</td>
	               					<td width="20%"> Nigeria</td>
	               					<td width="20%">37.1</td>
	               					<td width="20%">2.17%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">12</td>
	               					<td width="20%">Kazakhstan</td>
	               					<td width="20%">30</td>
	               					<td width="20%">1.76%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">13</td>
	               					<td width="20%">China</td>
	               					<td width="20%">25.7</td>
	               					<td width="20%">1.50%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">14</td>
	               					<td width="20%">Qatar</td>
	               					<td width="20%">25.2</td>
	               					<td width="20%">1.48%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">15</td>
	               					<td width="20%">Brazil</td>
	               					<td width="20%">12.6</td>
	               					<td width="20%">0.74%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td colspan="2">Total </td>
	               					<td width="20%">1586.1</td>
	               					<td width="20%">92.9%</td>
	               					
	               				</tr>
	               			</tbody>
	               		</table>
	               		<p><img src="http://sinochem-b2b-dev.oss-cn-beijing.aliyuncs.com/upload/20171218/93611513577077218.jpg"></p><p><br></p>
	               </span> 
	        	</div>
	        </div>
	      </div>
	    </div>
	</section>
</template>

<script>
	export default{
		data(){
			return {
				num:0
			}
		},
		methods:{
			leftTab(){
				$('.wl_yyxq_l').on('click', 'li', function(event) { 
					var index=$(this).index();
					$(this).find('.wl_yyxq_tab').addClass('active').parents().siblings('li').find('.wl_yyxq_tab').removeClass('active')
					$('.wl_yyxq_r .tab_detail').eq(index).addClass('show').siblings().removeClass('show')
				});
			},
			getBk:function(){
				window.open(configURL.infoUrl+"/page/#/encyclopedia","_self");
			},
			show(){
				if(this.$route.query.name == '游轮'){
					this.num = 3
				}else if(this.$route.query.name == '战争'){
					this.num = 0
				}else if(this.$route.query.name == '风力'){
					this.num = 1
				}else if(this.$route.query.name == '滞期费'){
					this.num = 6
				}else if(this.$route.query.name == '基本费率'){
					this.num = 5
				}else if(this.$route.query.name == '点数'){
					this.num = 4
				}else if(this.$route.query.name == '航线'){
					this.num = 7
				}else if(this.$route.query.name == '分布'){
					this.num = 8
				}
				
			}
		},
		created(){
			
		},
		mounted(){
			this.leftTab()
			this.show()
		}
	}
</script>

<style scoped>
	
</style>