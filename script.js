const connectionImg = document.querySelector('#image');
const bgColor = document.querySelector('#main');
const currentstatus = document.querySelector('#status');

function setColor()
{
    bgColor.classList.add("online");
}

async function connectionStatus()
{
    try
    {
        const fetchResult = await fetch("https://image.shutterstock.com/image-vector/offline-icon-isolated-sign-symbol-260nw-1524882083.jpg?time="+ (new Date()).getTime());

        connectionImg.src = "./images/online.png";
        setColor();

        return fetchResult.status>=200 && fetchResult.status<300;
    }
    catch(error)
    {
        currentstatus.textContent = "Oops!! Your internet connection is down";
        connectionImg.src = "./images/offline.png";
        bgColor.classList.remove("online");
    }
}

// Monitor connection
setInterval(async () =>
{
    const result = await connectionStatus();

    if(result)
    {
        currentstatus.textContent = "You're online and connection looks good";
        setColor();
    }
},5000);

// Check connection when the page loads
window.addEventListener('load', (event) => {
    
    if(connectionStatus())
    {
        currentstatus.textContent = "You're Online";
    }
    else
    {
        currentstatus.textContent = "You're Offline";
    }
});