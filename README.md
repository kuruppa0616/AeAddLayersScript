# AeAddLayersScript
AEでボタンを押すとレイヤーが生成されるスクリプトです。  
こんな感じの動作です。
<blockquote class="twitter-video" data-lang="ja"><p lang="ja" dir="ltr">既によく似たのあるけど個人的に物足りなかったのでAEスクリプト作った <a href="https://t.co/0xEUsi9q1f">pic.twitter.com/0xEUsi9q1f</a></p>&mdash; くるっぱ (@kuruppa0616) <a href="https://twitter.com/kuruppa0616/status/802153332634570752">2016年11月25日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>  
-ボタンを押すとそれに対応するレイヤーが生成されます。既存のレイヤーを選択している場合はその上に生成され、デュレーションが合わされます。  
-ボタンの行の上が2Dレイヤーで下が3Dレイヤーです。

cc2015.3とcc2017で動くはずです。他のバージョンは試してませんが多分動くと思います。  
バグとかあると思うので自己責任で適当に使ってください。  
UIの実装部分は[SceneSplitter](https://github.com/rlldi/aescripts/tree/master/released/SceneSplitter)を参考にさせてもらっています。
