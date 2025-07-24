import altair as alt
import pandas as pd
import json
import os
import altair_viewer


# Create dummy placeholder data (structure only — will be replaced in React)
df = pd.DataFrame({
    'x':        [1,2,3,4,5,6],
    'y':        [10,20,30,40,50,60,],
    'category': ['A','B','A','B','C','C'],
    'size':     [40 ,80 ,150,200,300,100]
})

chart = alt.Chart(df).mark_circle().encode(
    x=alt.X('x:Q', title='X Value'),
    y=alt.Y('y:Q', title='Y Value'),
    color=alt.Color('category:N', legend=None),
    size=alt.Size('size:Q', scale=alt.Scale(range=[10, 300]))
).properties(
    width=700,
    height=300
)

altair_viewer.show(chart)
# Inject named dataset for dynamic data injection
spec = chart.to_dict()
spec['data'] = {'name': 'mydata'}

# Save to JSON
os.makedirs("frontend/public", exist_ok=True)
with open("frontend/public/chart.json", "w") as f:
    json.dump(spec, f)

