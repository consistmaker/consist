import sys
import json
import yt_dlp
import datetime

channels = {
    "MusicLabChill": "https://www.youtube.com/@MusicLabChill",
    "CosmicHippoSounds": "https://www.youtube.com/@CosmicHippoSounds",
    "GrindnGroove": "https://www.youtube.com/@GrindnGroove",
    "MMStudioX": "https://www.youtube.com/@MMStudioX",
    "WorkBeatsLab": "https://www.youtube.com/@WorkBeatsLab",
    "StillMindMusicOfficial": "https://www.youtube.com/@StillMindMusicOfficial"
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
            
            # Since yt-dlp might paginate through different tabs, some entries might be playlists.
            # Let's filter for just valid videos with view counts.
            valid_videos = []
            total_views = 0
            for v in videos:
                view_count = v.get('view_count', 0)
                if view_count is None: view_count = 0
                upload_date = v.get('upload_date', '00000000') # YYYYMMDD
                if not upload_date: upload_date = '00000000'
                title = v.get('title', '')
                
                # We filter by 1 year ago, but if upload_date is missing, it skips.
                if upload_date >= one_year_ago:
                    valid_videos.append({'title': title, 'views': view_count, 'date': upload_date})
                    total_views += view_count
            
            # Sort by views descending
            valid_videos.sort(key=lambda x: x['views'], reverse=True)
            
            above_1m = [v for v in valid_videos if v['views'] >= 1000000]
            between_100k_1m = [v for v in valid_videos if 100000 <= v['views'] < 1000000]
            
            avg_views = total_views / len(valid_videos) if len(valid_videos) > 0 else 0
            
            print(f"Recent videos (last 1 yr): {len(valid_videos)}")
            print(f"Average views (recent): {avg_views:.0f}")
            print(f"Above 1M: {len(above_1m)}")
            for v in above_1m:
                print(f"  - {v['title']} ({v['views']} views, {v['date']})")
                
            print(f"100K to 1M: {len(between_100k_1m)}")
            for v in between_100k_1m:
                print(f"  - {v['title']} ({v['views']} views, {v['date']})")
            print("")
            
            # Just in case our date filter failed, let's print ALL-TIME top 3:
            all_videos = [{'title': v.get('title',''), 'views': v.get('view_count') or 0, 'date': v.get('upload_date') or '0'} for v in videos]
            all_videos.sort(key=lambda x: x['views'], reverse=True)
            print("  [ALL TIME TOP 3]:")
            for v in all_videos[:3]:
                print(f"    - {v['title']} ({v['views']} views, {v['date']})")
            print("="*40)
            
    except Exception as e:
        print(f"Error fetching {name}: {e}")
