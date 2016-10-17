# drunk-tweet-bot
Destroys tweets that include derogatory, offensive material or seem like something sent while drunk

## Use
Prior to deploying the bot, a `config.js` file must be created in the directory. In this file, insert your Twitter API keys like this:

```javascript
module.exports = {
	consumer_key: 				'...',
	consumer_secret: 			'...',
	access_token: 				'...',
	access_token_secret: 		'...'
}
```
If the source code for your directory is shared or public, this file should be added to your `.gitignore` file. From your terminal, `cd` into the bot directory and do this:

```bash
echo config.js >> .gitignore
```