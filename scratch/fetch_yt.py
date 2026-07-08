import urllib.request
import json
import re

channels = [
    "https://www.youtube.com/@MusicLabChill/videos",
    "https://www.youtube.com/@CosmicHippoSounds/videos",
    "https://www.youtube.com/@GrindnGroove/videos",
    "https://www.youtube.com/@MMStudioX/videos",
    "https://www.youtube.com/@WorkBeatsLab/videos",
    "https://www.youtube.com/@StillMindMusicOfficial/videos"
]

def parse_views(v_str):
    v = v_str.lower().replace(',', '').replace('.', '').replace(' views', '').replace('x ditonton', '').replace(' rb', '000').replace(' jt', '000000').strip()
    if 'k' in v:
        v = float(v.replace('k', '')) * 1000
    elif 'm' in v:
        v = float(v.replace('m', '')) * 1000000
    else:
        try: v = int(v)
        except: v = 0
    return v

def is_recent(t_str):
    t = t_str.lower()
    if 'year' in t or 'tahun' in t:
        if '1 year' in t or '1 tahun' in t: return True
        return False
    return True

results = {}

for url in channels:
    print("Processing", url)
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 'Accept-Language': 'en-US,en;q=0.9'}
    try:
        html = urllib.request.urlopen(urllib.request.Request(url, headers=headers)).read().decode('utf-8')
        match = re.search(r'var ytInitialData = (.*?);</script>', html)
        if not match:
            print("No ytInitialData for", url)
            continue
        data = json.loads(match.group(1))
        tabs = data['contents']['twoColumnBrowseResultsRenderer']['tabs']
        v_tab = next(t for t in tabs if t.get('tabRenderer', {}).get('title') == 'Videos')['tabRenderer']
        if 'content' not in v_tab: continue
        items = v_tab['content']['richGridRenderer']['contents']
        
        above_1m = []
        between_1k_1m = [] # 100k
        total_v = 0
        
        for item in items:
            video = item.get('richItemRenderer', {}).get('content', {}).get('videoRenderer', {})
            if not video: continue
            title = video.get('title', {}).get('runs', [{}])[0].get('text', '')
            view_text = video.get('viewCountText', {}).get('simpleText', '0 views')
            pub_text = video.get('publishedTimeText', {}).get('simpleText', '')
            
            views = parse_views(view_text)
            total_v += views
            
            if is_recent(pub_text):
                if views >= 1000000:
                    above_1m.append({'title': title, 'views': views, 'age': pub_text})
                elif views >= 100000:
                    between_1k_1m.append({'title': title, 'views': views, 'age': pub_text})
        
        avg = total_v / len([i for i in items if 'richItemRenderer' in i]) if items else 0
        results[url] = {
            'total_on_page': len([i for i in items if 'richItemRenderer' in i]),
            'avg_views': avg,
            'above_1m': above_1m,
            '100k_to_1m': between_1k_1m
        }
    except Exception as e:
        print("Error on", url, e)

for c, d in results.items():
    print(f"--- {c} ---")
    print(f"Avg views: {int(d['avg_views'])}")
    print(f"Above 1M: {len(d['above_1m'])}")
    for x in d['above_1m']: print(f"  - {x['title']} ({int(x['views'])})")
    print(f"100k-1M: {len(d['100k_to_1m'])}")
    for x in d['100k_to_1m']: print(f"  - {x['title']} ({int(x['views'])})")
