<!DOCTYPE html>
<html>
<head>
    <title>Deep Podcast</title>
</head>
<body style=" margin: 0; padding: 0;">
    <div style="background-color: purple;">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; max-width: 1280px; margin: 0 auto; padding: 16px;">
            <a href="#" style="display: flex; align-items: center; text-decoration: none; color: #fff;">

                <span style="margin-bottom: 8px; font-size: 36px;">Deep Podcast</span>
            </a>

        </div>
    </div>
    <div style="flex-direction:column;">
    <div style="height: 90px; display: flex; background-color: #333;">
        <div style="padding: 4px; margin: 2px; flex-direction: column;">
            <div style="display: flex; width: 6rem; justify-content: center; background-color: #4a4949; border-radius: 10px; ">
                <!-- <h5 style="font-size: 14px; color: #fff;">Home</h5>
                <h6 style="margin-top: 4px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </h6> -->
                <h2 style="color: #fff; font-weight: 200; padding: 6px;">New</h2>
            </div>

        </div>
    </div>
    <div style="flex-direction:column; background-color: #ccc;  padding: 24px; height: calc(100vh - 90px);  overflow-y: auto;">
        <h1 style="display: flex; flex-direction: column; color: #fff; font-size: 48px; font-weight: bold; font-family: monospace;">
            <h1 style="margin-bottom: 8px; font-size: 36px;">We Deliver To You Fresh</h1>
            <h1 style="color: #8b5cf6; font-size: 24px;">Podcast Everyday</h1>
        </h1>
        <div style="background-color: #fff; border-radius: 8px; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); padding: 16px; margin-bottom: 16px;">
            <p style="font-size: 24px;">{{ $data['title'] }}</p>
            <p style="font-size: 14px; color: #888; margin-top: 8px;">
                Description: {{ $data['description'] }}
            </p>
            <p style="font-size: 14px; color: #888; margin-top: 8px;">
                Click here: {{ $data['url'] }}
            </p>
        </div>
    </div>
</div>

    <footer style="background-color: purple; border-radius: 8px; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); padding: 10px; margin: 16px; display: flex; justify-content: space-between;">
        <div style="max-width: 1280px; padding: 16px; display: flex; flex-wrap: wrap; align-items: center;">
            <span style="font-size: 12px; color: #fff; text-align: center;">© 2023 <a href="#" style="color: #fff; text-decoration:none;">Deep Podcast™</a>. All Rights Reserved.</span>
        </div>
        <ul style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 8px; font-size: 12px; font-weight: 500; color: #fff; text-decoration: none; list-style: none;">
            <li style="margin-right: 8px;"><a href="#" style="color: #fff; text-decoration: none;">About</a></li>
            <li style="margin-right: 8px;">  <a href="#" style="color: #fff; text-decoration: none;">Privacy</a></li>
            <li style="margin-right: 8px;">  <a href="#" style="color: #fff; text-decoration: none;">Policy</a></li>
            <li><a href="#" style="color: #fff; text-decoration: none;">Contact</a></li>
        </ul>
    </footer>
</body>
</html>

