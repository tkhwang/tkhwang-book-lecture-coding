import pymupdf
import os

pdf_file_path = "chat04/data/1706.03762v7.pdf"
doc = pymupdf.open(pdf_file_path)

header_height = 120
footer_height = 60

full_text = ""


for page in doc:
    rect = page.rect

    header = page.get_text(clip=(0, 0, rect.width, header_height))
    footer = page.get_text(
        clip=(0, rect.height - footer_height, rect.width, rect.height)
    )

    text = page.get_text(
        clip=(0, header_height, rect.width, rect.height - header_height - footer_height)
    )

    full_text += text + "\n---------------------------\n"


print(full_text)

pdf_file_name = os.path.basename(pdf_file_path)
pdf_file_name = os.path.splitext(pdf_file_name)[0]

txt_file_path = f"chat04/data/{pdf_file_name}.txt"

with open(txt_file_path, "w", encoding="utf-8") as f:
    f.write(full_text)
