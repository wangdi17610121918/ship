<template>
	<section>
		<div class="wl_yybg"></div>
	    <div class="inner">
	      <div class="wl_yyxq">
	        <ul class="wl_yyxq_l">
	          <li><a class="wl_yyxq_tab" :class="num == 0 ? 'active' : ''">战争险区域</a></li>
	          <li><a class="wl_yyxq_tab" :class="num == 1 ? 'active' : ''">风力、海浪级别对照表</a></li>
	          <li><a class="wl_yyxq_tab" :class="num == 3 ? 'active' : ''">船型</a></li>
	          <li><a class="wl_yyxq_tab" :class="num == 4 ? 'active' : ''">WS点数</a></li>
	          <li><a class="wl_yyxq_tab" :class="num == 5 ? 'active' : ''">基本费率</a></li>
	          <li><a class="wl_yyxq_tab" :class="num == 6 ? 'active' : ''">滞期费</a></li>
	          <li><a class="wl_yyxq_tab" :class="num == 7 ? 'active' : ''">主要运输航线</a></li>
	          <li><a class="wl_yyxq_tab" :class="num == 8 ? 'active' : ''">世界石油分布</a></li>
	          <li><a href="javascript:;" class="wl_yyxq_qt" @click="getBk()">其它百科</a></li>
	        </ul>
	        <div class="wl_yyxq_r">
	        	<div class="tab_detail" :class="num == 0 ? 'show' : ''">
	              <h2>战争险区域</h2>
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
	               <h2>风力、海浪级别对照表内容</h2> 
	               <h2>风力级别</h2>
	               <span>
	               		<table border="1" width="100%" style="width: 100%" id="tableOne">
	               			<tbody>
	               				<tr style="font-weight: bold; text-align: center;height: 20px;">
	               					<td width="20%">级别</td>
	               					<td colspan="2">名称</td>
	               					<td width="20%">风速（m/s）</td>
	               					<td width="20%">风速（kt）</td>
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
	               		<h2>海浪</h2>
	               		<table border="1" width="100%" style="width: 100%" id="tableOne">
	               			<tbody>
	               				<tr style="font-weight: bold; text-align: center;height: 20px;">
	               					<td width="20%">级别</td>
	               					<td colspan="2">名称</td>
	               					<td width="20%">高度（米）</td>
	               					
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
	               <h2>船型</h2>
	               <span>
	               		<p>特大型油轮（ULCC）       总载重量32万吨以上</p>
						<p>超大型油轮（VLCC）       总载重量20-32万吨之间</p>
						<p>苏伊士型油轮（Suezmax）  总载重量12-20万吨之间</p>
						<p>阿芙拉型油轮（Aframax）   总载重量8-12万吨之间</p>
						<p>巴拿马型油轮（Panamax）   总载重量6-8万吨之间</p>
						<p>轻便型油轮（MR Size）      总载重量1-6万吨之间</p>
	               </span>
	        	</div>
	        	<div class="tab_detail" :class="num == 4 ? 'show' : ''">
	               <h2>WS点数</h2>
	               <span>
	               		<p style="text-indent: 32px;">WORLDSCALE，全称国际油轮名义运费(New Worldwide Tanker Nominal Freight Scale)，简称WS。在国际油运市场，对油轮运费水平的制定及计算已形成的通行的准则。在租船合同中明确要求船东、租家遵从WORLD SCALE有关运费的具体规定。</p>
						<p>总运费=基本费率×计费吨×WS点数</p>
						<p>对于总运费以外其他费用的承担原则做出规定：</p>
						<p>-- 规定港口货物税、运费税、直升飞机费等由租家承担。</p>
						     <p> -- 规定针对船舶征收的费用由船东承担。</p>
	               </span> 
	        	</div>
	        	<div class="tab_detail" :class="num == 5 ? 'show' : ''">
	               <h2>基本费率</h2>
	               <span>
	               	<p style="text-indent: 32px;">以75000吨级油轮为标准船型，计算船东执行某一航线航行的总体运输成本，对这一特定航线所规定的以美元/吨为单位的运费费率。</p>
	               	<p style="text-indent: 32px;">根据船用燃料油成本、装卸港港口费用的不断变化，对外出版费率规定手册。每年调整一次，年中因重大变化而调整费率，则以通告形式发布。</p>
	               </span>  
	        	</div>
	        	<div class="tab_detail" :class="num == 6 ? 'show' : ''">
	               <h2>滞期费</h2> 
	               <span>
	               	<p style="text-indent: 32px;">滞期费是指承租人超出租约约定的允许装卸时间，需支付船东该部分逾期时间的费用。允许装卸时间，是指基于租合同，船东提供给租家船舶装货和卸货而不额外加收费用的时间。实际租船谈判中允许装卸时间通常为：超大型油轮120小时、苏伊士/阿芙拉型油轮96小时。</p>
	               </span>
	        	</div>
	        	<div class="tab_detail" :class="num == 7 ? 'show' : ''">
	               <h2>主要运输航线</h2>
	               <span>
	               		<p style="text-indent:32px;line-height:150%">
	               			<span style="font-size: 16px;line-height: 150%">由于世界原油产地，消费地界的不同，构成世界上主要八条油运航线是：<img src="http://sinochem-b2b-dev.oss-cn-beijing.aliyuncs.com/upload/20171218/74481513581355600.jpg" style="width: 699px; height: 507px;"></span>
	               		</p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">（<span>1</span>）通道<span>1</span>：霍尔木兹海峡（<span>Strait of Hormuz</span>）</span></p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">隶属于伊朗的霍尔木兹海峡是全世界最主要的原油<span>“</span>咽喉<span>”</span>要道，被西方誉为<span>“</span>海上生命线<span>”</span>。来自沙特、阿联酋、卡塔尔、伊朗和伊拉克的原油全部都要通过这条海峡交付给国际买家，多数流向亚洲。</span>
	               		</p><p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">霍尔木兹海峡还有个优势：全球体量最大的油轮都可以从容通过。</span></p><p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">正是依赖这样一条极具战略意义的原油贸易<span>“</span>咽喉<span>”</span>要道，伊朗在国际社会拥有不可忽视的地位。</span></p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">（<span>2</span>）通道<span>2</span>：马六甲海峡（<span>Strait of Malacca</span>）</span></p><p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">马六甲海峡是连接印度洋、南中国海和太平洋的最短水上航道，现由新加坡、马来西亚和印度尼西亚三国共同管辖。途经此地的中东原油主要运往中国、日本和印尼。尤其是日本，这条海峡被称为日本的<span>“</span>海上生命线<span>”</span>。</span></p><p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">与霍尔木兹海峡恰恰相反，马六甲海峡是全世界最狭窄的海上航道之一，最窄处仅<span>1.7</span>英里，形成天然的运输瓶颈。目前，它已成为海盗最新的活跃区域之一。</span></p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">（<span>3</span>）通道<span>3</span>：好望角（<span>Cape of Good Hope</span>）</span></p><p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">位于非洲西南端的好望角也是一条重要的原油贸易通道。目前是西非原油运往亚洲地区的主要通道。</span></p><p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">好望角的地位还在于：假如苏伊士运河或者曼德海峡这样的主要航运通道关闭，它就将成为次要的原油输送通道。不过，一旦油轮改变航线转往好望角，那么运输成本将显著增加，因为这意味着从沙特到美国的油轮必须多航行<span>2700</span>英里。</span></p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">（<span>4</span>）通道<span>4</span>：曼德海峡（<span>Bab el-Mandab</span>）</span></p><p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">连接着红海和亚丁湾、并最终通往印度洋的曼德海峡最窄处仅<span>18</span>英里。如果它关闭或者处于不稳定状态，那么国际油轮将被迫改变航线转往非洲南部的好望角。</span></p><p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">在美国能源信息署（<span>EIA</span>）看来，至关重要的一点是：前往苏伊士运河的大量油轮必须经过曼德海峡，因此，这条海峡的关闭将导致较严重的后果。</span></p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">（<span>5</span>）通道<span>5</span>：丹麦海峡（<span>Danish Straits</span>）</span></p><p style="text-indent:24px;line-height:150%"><span style="font-size: 16px;line-height: 150%">&nbsp;</span><span style="font-size: 16px;line-height: 150%">位于丹麦属地格陵兰岛和冰岛之间的丹麦海峡是全球最安全的原油海运通道之一。这个海峡东连波罗的海，西接北海。</span></p><p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">尽管欧洲目前和俄罗斯的关系非常紧张，尤其是在波罗的海沿岸国家，但油轮之类的货船并未受到区域安全方面的威胁。一小部分来自挪威和英国的石油也从丹麦海峡去往波罗的海国家。这也意味着，如果俄罗斯封锁了丹麦海峡，那么就等于封锁了自己的原油贸易输出通道。</span></p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">（<span>6</span>）通道<span>6</span>：苏伊士运河（<span>Suez Canal</span>）</span></p><p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">苏伊士运河贯通埃及苏伊士地峡，连接红海和地中海。穿越这里的原油多数都被售往欧洲和北美地区。</span></p><p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">据美国能源信息署记载，苏伊士运河曾在<span>2010</span>年扩增，以便允许全球<span>60%</span>左右的油轮能够更有效地通过。埃及前总统穆巴拉克<span>2011</span>年下台和由此引发的动荡都未能影响国际油轮途经这条运河。但是，苏伊士运河的航运安全仍是国际</span></p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">&nbsp;</span><span style="font-size: 16px;line-height: 150%">（<span>7</span>）通道<span>7</span>：博斯普鲁斯海峡（<span>Bosporus Straits</span>）</span></p><p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">博斯普鲁斯海峡是一条狭长的水道，连接着黑海和地中海。它将土耳其伊斯坦布尔的亚洲部分和欧洲部分隔开。该海峡最窄处仅<span>0.5</span>英里，每年平均约有<span>4.8</span>万艘船只穿越这片水域。</span></p><p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">据美国能源信息署，俄罗斯已开始慢慢将其原油出口转往波罗的海。阿塞拜疆和哈萨克斯坦则进一步增加了经过博斯普鲁斯海峡的运量。</span></p>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">（<span>8</span>）通道<span>8</span>：巴拿马运河（<span>Panama Canal</span>）</span></p><p style="text-indent:32px;line-height:150%"><span style="font-size: 16px;line-height: 150%">巴拿马运河连接着太平洋和加勒比海，最终流入大西洋。</span></p><p>然而，自从建成后，巴拿马运河的效用在逐渐减弱，因部分水道最窄处仅为110英尺。体型较大的超级油轮无法通过这里。2016年6月26日，巴拿马运河迎来新的阶段——扩建船闸竣工通航，以使得大型油轮足以穿越这里。</p>
	               </span> 
	        	</div>
	        	<div class="tab_detail" :class="num == 8 ? 'show' : ''">
	               <h2>世界石油分布</h2>
	               <span>
	               		<p style="text-indent:32px;line-height:150%"><span style="font-size:16px;line-height:150%">世界石油资源集中在中东、中南美洲、北美洲等地，且近十年除中南美洲探明储量有较大增长外，其他地区变化不大。截至<span>2016</span>年底，全球探明储量为<span>1.7</span>万亿桶，中东储量占据近半壁江山（<span>47.7%</span>）。中东以下探明储量排序为：中南美洲（<span>19.2%</span>）、北美洲（<span>13.3%</span>）、欧洲及欧亚大陆（<span>9.5%</span>）、非洲（<span>7.5%</span>）、亚太地区（<span>2.8%</span>）。</span></p>
	               		<p style="text-indent: 32px;">世界石油探明储量最多的15个国家占全球储量92.9%，依次为：委内瑞拉（17.63%）、沙特（15.61%）、加拿大（10.05%）、伊朗（9.28%）、伊拉克（8.96%）、俄罗斯（6.41%）、科威特（5.95%）、阿联酋（5.73%）、利比亚（2.83%）、美国（2.81%）、尼日利亚（2.17%）、哈萨克斯坦（1.76%）、中国（1.5%）、卡塔尔（1.48%）、巴西（0.74%）。</p>
	               		<p style="text-align: center;">表 1&nbsp; 石油探明储量及占比情况</p>
	               		<table border="1" width="100%" style="width: 100%" id="tableOne">
	               			<tbody>
	               				<tr style="font-weight: bold; text-align: center;height: 20px;">
	               					<td width="20%">序号</td>
	               					<td width="20%">国家</td>
	               					<td width="20%">探明储量（十亿桶）</td>
	               					<td width="20%">比例</td>
	               					
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">1</td>
	               					<td width="20%">委内瑞拉</td>
	               					<td width="20%">300.9</td>
	               					<td width="20%">17.63%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">2</td>
	               					<td width="20%">沙特</td>
	               					<td width="20%">266.5</td>
	               					<td width="20%">15.61%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">3</td>
	               					<td  width="20%">加拿大</td>
	               					<td width="20%">171.5</td>
	               					<td width="20%">10.05%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">4</td>
	               					<td width="20%">伊朗</td>
	               					<td width="20%">158.4</td>
	               					<td width="20%">9.28%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">5</td>
	               					<td width="20%">伊拉克</td>
	               					<td width="20%">153</td>
	               					<td width="20%">8.96%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">6</td>
	               					<td width="20%">俄罗斯</td>
	               					<td width="20%">109.5</td>
	               					<td width="20%">6.41%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">7</td>
	               					<td width="20%">科威特</td>
	               					<td width="20%">101.5</td>
	               					<td width="20%">5.95%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">8</td>
	               					<td width="20%">阿联酋</td>
	               					<td width="20%">97.8</td>
	               					<td width="20%">5.73%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">9</td>
	               					<td width="20%">利比亚</td>
	               					<td width="20%">48.4</td>
	               					<td width="20%">2.83%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">10</td>
	               					<td width="20%">美国</td>
	               					<td width="20%">48</td>
	               					<td width="20%">2.81%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">11</td>
	               					<td width="20%">尼日利亚</td>
	               					<td width="20%">37.1</td>
	               					<td width="20%">2.17%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">12</td>
	               					<td width="20%">哈萨克斯坦</td>
	               					<td width="20%">30</td>
	               					<td width="20%">1.76%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">13</td>
	               					<td width="20%">中国</td>
	               					<td width="20%">25.7</td>
	               					<td width="20%">1.50%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">14</td>
	               					<td width="20%">卡塔尔</td>
	               					<td width="20%">25.2</td>
	               					<td width="20%">1.48%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td width="20%">15</td>
	               					<td width="20%">巴西</td>
	               					<td width="20%">12.6</td>
	               					<td width="20%">0.74%</td>
	               				</tr>
	               				<tr style="text-align: center;height: 20px;">
	               					<td colspan="2">合计</td>
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