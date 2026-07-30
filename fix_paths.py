import os

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.jsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            new_content = content.replace('"/assets/', '"/website/assets/').replace("'/assets/", "'/website/assets/")
            if content != new_content:
                with open(path, 'w', encoding='utf-8', newline='') as f:
                    f.write(new_content)
                print(f'Updated {path}')
