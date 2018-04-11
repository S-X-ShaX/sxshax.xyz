// build time:Wed Apr 11 2018 14:21:42 GMT+0800 (CST)
"use strict";var SUBSTRING_OFFSET=15;var MAX_KEYWORDS=30;var MAX_DISPLAY_SLICES=5;function findKeywords(e,t){for(var n=0;n<e.length;++n){var r=t["dataContent"].toLowerCase().indexOf(e[n].toLowerCase());while(r>=0){t["matchedContentKeywords"].push({keyword:t["dataContent"].substring(r,r+e[n].length),index:r});r=t["dataContent"].toLowerCase().indexOf(e[n].toLowerCase(),r+e[n].length)}var a=t["dataTitle"].toLowerCase().indexOf(e[n].toLowerCase());while(a>=0){t["matchedTitleKeywords"].push({keyword:t["dataTitle"].substring(a,a+e[n].length),index:a});a=t["dataTitle"].toLowerCase().indexOf(e[n].toLowerCase(),a+e[n].length)}}}function buildSortedMatchedDataProps(e,t){var n=[];for(var r=0;r<e.length;++r){var a={matchedContentKeywords:[],matchedTitleKeywords:[],dataTitle:e[r]["title"].trim(),dataContent:e[r]["content"].trim().replace(/<[^>]+>/g,""),dataURL:e[r]["url"]};if(a["dataTitle"].length+a["dataContent"].length>0){findKeywords(t,a)}if(a["matchedContentKeywords"].length+a["matchedTitleKeywords"].length>0){n.push(a)}}n.sort(function(e,t){return-(e["matchedContentKeywords"].length+e["matchedTitleKeywords"].length-(t["matchedContentKeywords"].length+t["matchedTitleKeywords"].length))});return n}function buildSortedSliceArray(e){var t=[];e["matchedContentKeywords"].sort(function(e,t){return e["index"]-t["index"]});for(var n=0;n<e["matchedContentKeywords"].length&&n<MAX_DISPLAY_SLICES;++n){var r=e["matchedContentKeywords"][n]["index"]-SUBSTRING_OFFSET;var a=e["matchedContentKeywords"][n]["index"]+e["matchedContentKeywords"][n]["keyword"].length+SUBSTRING_OFFSET;if(r<0){r=0}if(r===0){a=SUBSTRING_OFFSET+e["matchedContentKeywords"][n]["keyword"].length+SUBSTRING_OFFSET}if(a>e["dataContent"].length){a=e["dataContent"].length}t.push({start:r,end:a})}return t}function mergeSliceArray(e){var t=[];if(e.length===0){return t}t.push(e[0]);for(var n=1;n<e.length;++n){if(t[t.length-1]["end"]>=e[n]["start"]){if(e[n]["end"]>t[t.length-1]["end"]){t[t.length-1]["end"]=e[n]["end"]}}else{t.push(e[n])}}return t}function buildHighlightedTitle(e){var t=e["dataTitle"];var n=[];for(var r=0;r<e["matchedTitleKeywords"].length;++r){if(e["matchedTitleKeywords"][r]["keyword"].length>0){n.push(e["matchedTitleKeywords"][r]["keyword"])}}var a=new RegExp(n.join("|"),"gi");t=t.replace(a,'<strong class="search-keyword">$&</strong>');return t}function buildHighlightedContent(e,t){var n=[];for(var r=0;r<t.length;++r){n.push(e["dataContent"].substring(t[r]["start"],t[r]["end"]))}var a=[];for(var r=0;r<e["matchedContentKeywords"].length;++r){if(e["matchedContentKeywords"][r]["keyword"].length>0){a.push(e["matchedContentKeywords"][r]["keyword"])}}var o=new RegExp(a.join("|"),"gi");for(var r=0;r<n.length;r++){n[r]=n[r].replace(o,'<strong class="search-keyword">$&</strong>')}return n.join("...")}function onInput(e,t,n){t.innerHTML="";if(e.value.trim().length<=0){return}var r=e.value.trim().split(/[\s-\+]+/);var a=[];if(r.length>MAX_KEYWORDS){r=r.slice(0,MAX_KEYWORDS)}var o=buildSortedMatchedDataProps(n,r);if(o.length===0){return}a.push('<ul class="search-result-list">');for(var d=0;d<o.length;++d){a.push('<li><a href="');a.push(o[d]["dataURL"]);a.push('" class="search-result-title">&gt; ');a.push(buildHighlightedTitle(o[d]));a.push("</a>");a.push('<p class="search-result-content">...');var s=buildSortedSliceArray(o[d]);var i=mergeSliceArray(s);a.push(buildHighlightedContent(o[d],i));a.push("...</p>")}a.push("</ul>");t.innerHTML=a.join("")}function ajax(e,t){var n=null;if(window.XMLHttpRequest){n=new XMLHttpRequest}else if(window.ActiveXObject){n=new ActiveXObject("Microsoft.XMLHTTP")}if(n==null){alert("Your broswer does not support XMLHttpRequest!");return}n.onreadystatechange=function(){if(n.readyState!==4){return}if(n.status!==200){alert("XMLHttpRequest failed!");return}t(n)};n.open("GET",e,true);n.send(null)}var searchFunc=function(e,t,n){ajax(e,function(e){var r=[];if(e.responseXML){var a=e.responseXML;var o=a.getElementsByTagName("entry");for(var d=0;d<o.length;d++){r.push({title:o[d].getElementsByTagName("title")[0].innerHTML||"",content:o[d].getElementsByTagName("content")[0].innerHTML||"",url:o[d].getElementsByTagName("url")[0].innerHTML||""})}}else{var s=JSON.parse(e.response);for(var d=0;d<s.length;d++){r.push({title:s[d]["title"]||"",content:s[d]["content"]||"",url:s[d]["url"]||""})}}var i=document.getElementById(t);var l=document.getElementById(n);i.addEventListener("input",function(){onInput(i,l,r)})})};
//rebuild by neat 