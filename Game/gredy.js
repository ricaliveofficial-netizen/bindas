(() => {
  let balance = parseInt(localStorage.getItem("balance")) || 1000;
  const balanceEls = document.querySelectorAll(".balanceDisplay");
  const winListEl = document.getElementById("winList");
  const cardMultipliers = { c1:15, c2:10, c3:5, c4:5, c5:25, c6:45, c7:5, c8:5, c9:5 };
  const cardImages = { c1:"assets/cards/1.jpg", c2:"assets/cards/2.jpg", c3:"assets/cards/3.jpg", c4:"assets/cards/4.jpg", c5:"assets/cards/5.jpg", c6:"assets/cards/6.jpg", c7:"assets/cards/7.jpg", c8:"assets/cards/8.jpg", c9:"assets/cards/9.jpg" };

  let activeBet = 0;
  const userBets = {};
  updateBalance();

  function updateBalance(){
    balanceEls.forEach(el=>el.innerText = balance);
    localStorage.setItem("balance", balance);
  }

  const lastWins = [];
  function addWinToList(cardId, betAmount, multiplier, winAmount){
    const div = document.createElement("div");
    div.style.display="flex"; div.style.alignItems="center"; div.style.margin="4px 0"; div.style.background="#202533"; div.style.padding="4px"; div.style.borderRadius="6px";
    const img = document.createElement("img"); img.src = cardImages[cardId]; img.style.width="40px"; img.style.height="40px"; img.style.objectFit="cover"; img.style.marginRight="6px";
    const text = document.createElement("span"); text.style.fontSize="12px"; text.innerText = `Card: ${cardId}, Bet: ${betAmount}, Multiplier: ${multiplier}×, Win: ${winAmount}`;
    div.appendChild(img); div.appendChild(text);
    lastWins.push(div); if(lastWins.length>5) lastWins.shift(); winListEl.innerHTML=""; lastWins.forEach(d=>winListEl.appendChild(d));
  }

  // Bet buttons
  document.querySelectorAll(".amtBtn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      activeBet = parseInt(btn.dataset.value);
      document.querySelectorAll(".amtBtn").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // Card tap
  document.querySelectorAll(".card").forEach(card=>{
    card.addEventListener("click", ()=>{
      if(activeBet<=0){alert("Select a bet first!"); return;}
      if(balance<=0){alert("Balance too low! Recharge."); return;}
      if(activeBet>balance){alert("Insufficient balance."); return;}

      const cardId = card.id;
      balance-=activeBet;
      updateBalance();
      userBets[cardId]=(userBets[cardId]||0)+activeBet;
    });
  });

  // Recharge
  document.querySelector(".recharge").addEventListener("click", ()=>{
    const amt=parseInt(prompt("Enter recharge amount:", "5000"));
    if(!isNaN(amt)&&amt>0){balance+=amt; updateBalance();}
  });

  // Slide text scroll
  const slideTextEl = document.getElementById("slideText");
  let slidePos=0;
  setInterval(()=>{
    slidePos-=2;
    if(Math.abs(slidePos)>slideTextEl.scrollWidth) slidePos=slideTextEl.offsetWidth;
    slideTextEl.style.transform=`translateX(${slidePos}px)`;
  },50);

  // Timer & spin
  const timerEl=document.createElement("div");
  timerEl.style.textAlign="center"; timerEl.style.color="#00ff9d"; timerEl.style.marginBottom="10px";
  document.body.insertBefore(timerEl, document.querySelector(".slideText"));
  let timeLeft=30;
  setInterval(()=>{
    timeLeft--; timerEl.innerText=`⏳ Next Spin: ${timeLeft}s`;
    if(timeLeft<=0){spinCards(); timeLeft=30;}
  },1000);

  function spinCards(){
    const betCards = Object.keys(userBets).filter(c=>userBets[c]>0);
    if(betCards.length===0) return;
    const winningCard = betCards[Math.floor(Math.random()*betCards.length)];
    betCards.forEach(card=>{
      const betAmount = userBets[card];
      const multiplier = cardMultipliers[card];
      let winAmount = 0;
      if(card===winningCard){winAmount=betAmount*multiplier; balance+=winAmount;}
      addWinToList(card, betAmount, multiplier, winAmount);
    });
    updateBalance();
    Object.keys(userBets).forEach(c=>userBets[c]=0);
  }

})();