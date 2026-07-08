import sys
import json
import yt_dlp
import datetime

channels = {
    "MusicLabChill": "https://www.youtube.com/@MusicLabChill/videos",
    "CosmicHippoSounds": "https://www.youtube.com/@CosmicHippoSounds/videos",
    "GrindnGroove": "https://www.youtube.com/@GrindnGroove/videos",
    "MMStudioX": "https://www.youtube.com/@MMStudioX/videos",
    "WorkBeatsLab": "https://www.youtube.com/@WorkBeatsLab/videos",
    "StillMindMusicOfficial": "https://www.youtube.com/@StillMindMusicOfficial/videos"
}

ydl_opts = {
    'extract_flat': True,
    'quiet': True
}

one_year_ago = (datetime.datetime.now() - datetime.timedelta(days=365)).strftime("%Y%m%d")

for name, url in channels.items():
    print(f"--- Channel: {name} ---")
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            
            videos = info.get('entries', [])
            total_videos = len(videos)
            print(f"Total videos on channel: {total_videos}")
            
            above_1m = []
            between_100k_1m = []
            total_views = 0
            count_recent = 0
            
            for v in videos:
                view_count = v.get('view_count', 0)
                if view_count is None: view_count = 0
                upload_date = v.get('upload_date', '') # YYYYMMDD
                title = v.get('title', '')
                
                # Filter for last 1 year
                if upload_date and upload_date >= one_year_ago:
                    total_views += view_count
                    count_recent += 1
                    
                    if view_count >= 1000000:
                        above_1m.append((title, view_count, upload_date))
                    elif view_count >= 100000:
                        between_100k_1m.append((title, view_count, upload_date))
                        
            avg_views = total_views / count_recent if count_recent > 0 else 0
            print(f"Recent videos (last 1 yr): {count_recent}")
            print(f"Average views (recent): {avg_views:.0f}")
            print(f"Above 1M: {len(above_1m)}")
            for t in above_1m:
                print(f"  - {t[0]} ({t[1]} views, {t[2]})")
            print(f"100K to 1M: {len(between_100k_1m)}")
            for t in between_100k_1m:
                print(f"  - {t[0]} ({t[1]} views, {t[2]})")
            print("")
    except Exception as e:
        print(f"Error fetching {name}: {e}")
