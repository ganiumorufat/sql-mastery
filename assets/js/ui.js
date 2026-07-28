window.SQLMasteryUI=(()=>{const $=id=>document.getElementById(id),esc=v=>String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
function question(q,i,total,bad,module){$("qmeta").textContent=`Question ${i+1} of ${total} · ${q.difficulty}`;$("qtext").textContent=q.text;$("mapping").innerHTML=`<span class="pill">${esc(q.difficulty)}</span><span class="pill">${esc(module?.title||"SQL")}</span>`;const prompts=(module?.frameworkPrompts&&module.frameworkPrompts.length?module.frameworkPrompts:["What is the output grain?","What measure is aggregated?","Is grouping required?","Is an aggregate filter required?"]);$("frameworkFields").innerHTML=prompts.map((prompt,index)=>`<label>${index+1}. ${esc(prompt)}</label><input placeholder="Write your thinking...">`).join("");$("hintBox").innerHTML="";$("solutionBox").innerHTML="";$("lockText").textContent=bad>=3?"Solution unlocked after 3 incorrect attempts.":`Unlocks after 3 incorrect attempts. Current incorrect attempts: ${bad}.`;}
function hint(q,n){$("hintBox").innerHTML=`<div class="hintbox">${esc(q.hints[n-1]||"No additional hint.")}</div>`;}
function solution(sql){$("solutionBox").innerHTML=`<pre>${esc(sql)}</pre>`;}
function result(r){$("resultMeta").textContent=`${r.values.length} row(s) · ${r.elapsed.toFixed(1)} ms`;if(!r.columns.length){$("resultTable").innerHTML='<div class="empty">Query executed successfully.</div>';return;}const h=r.columns.map(c=>`<th>${esc(c)}</th>`).join(""),b=r.values.map(row=>`<tr>${row.map(v=>`<td>${esc(v===null?"NULL":v)}</td>`).join("")}</tr>`).join("");$("resultTable").innerHTML=`<div class="tablewrap"><table><thead><tr>${h}</tr></thead><tbody>${b}</tbody></table></div>`;}
function feedback(type,msg){$("status").className=`status ${type}`;$("status").textContent=type==="ok"?"✓ Correct":type==="bad"?"✗ Incorrect":"Ready";$("feedback").innerHTML=msg?`<div class="feedback">${esc(msg)}</div>`:"";}
function stats(s,total){const all=Object.values(s.questions),done=all.filter(x=>x.completed).length,attempts=all.reduce((a,x)=>a+(x.attempts||0),0),times=s.history.map(x=>x.elapsed).filter(Number.isFinite),avg=times.length?times.reduce((a,b)=>a+b,0)/times.length:0,tried=all.filter(x=>(x.attempts||0)>0),first=tried.filter(x=>x.completed&&x.firstTry).length;$("completedStat").textContent=`${done}/${total}`;$("attemptStat").textContent=attempts;$("avgTimeStat").textContent=`${avg.toFixed(0)} ms`;$("accuracyStat").textContent=`${tried.length?Math.round(100*first/tried.length):0}%`;$("progressBar").style.width=`${100*done/total}%`;}
function list(qs,s,current,select){
  const host=$("questionList");
  host.innerHTML="";
  const groups=[...new Set(qs.map(q=>q.difficulty).filter(Boolean))];
  groups.forEach(group=>{
    const groupQuestions=qs.map((q,i)=>({q,i})).filter(x=>x.q.difficulty===group);
    if(!groupQuestions.length)return;
    const section=document.createElement("section");
    section.className="question-group";
    section.innerHTML=`<div class="question-group-heading"><span>${esc(group)}</span><small>${groupQuestions.length} questions</small></div>`;
    const list=document.createElement("div");
    list.className="question-group-list";
    groupQuestions.forEach(({q,i})=>{
      const d=s.questions[q.num]||{};
      const attempts=d.attempts||0;
      let statusClass="not-started",statusText="Not Started",icon="○";
      if(d.completed){statusClass="completed";statusText="Completed";icon="✓";}
      else if(attempts>0){statusClass=attempts>=3?"needs-work":"attempted";statusText=`${attempts} Attempt${attempts===1?"":"s"}`;icon=attempts>=3?"!":"•";}
      const el=document.createElement("button");
      el.type="button";
      el.className=`question-row${d.completed?" done":""}${i===current?" current":""}`;
      el.innerHTML=`<span class="question-number">${q.num}</span><span class="question-copy"><b>${esc(q.text)}</b><small>Question ${q.num} · ${esc(q.difficulty)}</small></span><span class="question-status ${statusClass}"><i>${icon}</i>${statusText}</span>`;
      el.onclick=()=>select(i);
      list.appendChild(el);
    });
    section.appendChild(list);
    host.appendChild(section);
  });
}
function explorer(schema){$("explorerGrid").innerHTML=schema.map(t=>`<div class="card schema-card"><h3>${esc(t.name)} <span class="difficulty">(${t.count} rows)</span></h3><ul>${t.columns.map(c=>`<li><b>${esc(c.name)}</b> · ${esc(c.type||"TEXT")}${c.pk?" · primary key":""}</li>`).join("")}</ul></div>`).join("");}
function history(items){$("historyList").innerHTML=items.length?items.slice().reverse().map(x=>`<div class="history-item"><b>Question ${x.question} · ${x.correct?"Correct":"Incorrect"}</b><div class="difficulty">${new Date(x.time).toLocaleString()} · ${x.elapsed.toFixed(1)} ms</div><pre>${esc(x.sql)}</pre></div>`).join(""):'<div class="empty">No query history yet.</div>';}
return{question,hint,solution,result,feedback,stats,list,explorer,history};})();
