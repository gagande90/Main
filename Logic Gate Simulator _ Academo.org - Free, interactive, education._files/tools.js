var tools={textContainers:[],textFields:[],rollTextField:function(what,how){how=how||{};if(what.txt&&what.container)tools.rollText(what.container,what.txt,how.horizontal,how.infinite,how.noBreak,how.stopOnEnd,how.speed,how.speedMultiplier,how.customizeSpee,how.widthCorrection)},rollText:function(container,txt,horizontal,infinite,noBreak,stopOnEnd,speed,speedMultiplier,customizeSpeed,widthCorrection){horizontal=horizontal===undefined?!0:horizontal;var widthCorrection=widthCorrection||3;infinite=infinite===undefined?!0:infinite;var speed=(speed||(horizontal?4500:1000))*(speedMultiplier===undefined?1:speedMultiplier);if(customizeSpeed||customizeSpeed===undefined){var f=Number(txt.css("font-size").replace("px",""));if(!isNaN(f))speed*=(f/12)}
if(banner.flags.theEnd&&stopOnEnd)return;if(supportTransition){if(tools.textContainers.indexOf(container)==-1){tools.textContainers.push(container)}
if(tools.textFields.indexOf(txt)==-1){tools.textFields.push(txt)}
if(horizontal){txt.css('white-space','nowrap').css('width','auto')
if(txt.width()+widthCorrection<=container.width())return;txt.defaultHTML=txt.html();if(infinite&&!txt.ok){txt.html(txt.text()+(noBreak?"&nbsp;":"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"))}}else{if(txt.height()<=container.height())return;txt.defaultHTML=txt.html();if(infinite&&!txt.ok){txt.html(txt.defaultHTML+(noBreak?"<br>":"<br><br>"))}}
txt.css('transition-property','none').css('transform','none')
txt.containerSize=txt.containerSize===undefined?horizontal?container.width():container.height():txt.containerSize;txt.txtSize=txt.txtSize===undefined?(horizontal?txt.width()+widthCorrection:txt.height()):txt.txtSize;txt.delta=txt.delta===undefined?infinite?-txt.txtSize:txt.containerSize-txt.txtSize:txt.delta;if(infinite&&!txt.ok)txt.html(txt.html()+txt.html());if(txt.delta<0){txt.time=txt.time===undefined?(-txt.delta*80)/speed:txt.time;txt.startDelay=txt.startDelay===undefined?infinite?0:(txt.containerSize*50)/speed:txt.startDelay;txt.realDelta=txt.realDelta===undefined?infinite?Math.round(txt.delta+(txt.delta/(txt.time*60))):txt.delta:txt.realDelta;txt.realTime=txt.realTime===undefined?(-txt.realDelta*80)/speed:txt.realTime;txt.css('transition-property','transform').css('transition-timing-function','linear').css('transition-duration',txt.realTime+'s').css('transition-delay',txt.startDelay+'s').css('transform',horizontal?'translateX('+txt.realDelta+'px)':'translateY('+txt.realDelta+'px)')
txt.ok=!0;txt.timeouts=[];if(infinite){txt.timeouts[0]=setTimeout(function(){if(banner.flags.theEnd&&stopOnEnd)return;tools.stopTransform(txt)
tools.rollText(container,txt,horizontal,infinite,noBreak,stopOnEnd,speed,1,!1)},(txt.time+txt.startDelay)*1000);return}
txt.timeouts[0]=setTimeout(function(){if(banner.flags.theEnd&&stopOnEnd)return;txt.fadeOut();txt.timeouts[1]=setTimeout(function(){if(banner.flags.theEnd&&stopOnEnd)return;tools.stopTransform(txt);txt.timeouts[2]=setTimeout(function(){if(banner.flags.theEnd&&stopOnEnd)return;txt.fadeIn();txt.timeouts[3]=setTimeout(function(){tools.rollText(container,txt,horizontal,infinite,noBreak,stopOnEnd,speed,1,!1)},700)},300)},800)},(txt.time+txt.startDelay)*1000+2200)}}},stopRollAllTexts:function(clearValues){for(var i=0;i<tools.textContainers.length;i++){tools.stopTransform(tools.textContainers[i])}
for(i=0;i<tools.textFields.length;i++){var txt=tools.textFields[i];tools.stopAnim(txt)
if(clearValues)tools.clearTxtValues(txt)}
tools.textContainers=[];tools.textFields=[]},stopAnim:function(el){tools.stopTransform(el);tools.clearTimeouts(el)},stopTransform:function(el){el.css('transition-property','none').css('transition-duration','0s').css('transition-delay','0s').css('transform','none')},clearTimeouts:function(el){if(el.timeouts){for(var i=0;i<el.timeouts.length;i++){clearTimeout(el.timeouts[i])}}},clearTxtValues:function(txt){txt.ok=undefined;txt.containerSize=undefined;txt.txtSize=undefined;txt.delta=undefined;txt.time=undefined;txt.realTime=undefined;txt.startDelay=undefined;txt.realDelta=undefined;if(txt.defaultHTML)txt.html(txt.defaultHTML);txt.defaultHTML=undefined}}