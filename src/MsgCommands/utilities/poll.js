const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'poll',
  async execute(message, args) {
    let type = args[0];

    let errorEmbed = new EmbedBuilder()
      .setColor('#e0b0ff')
      .setAuthor({name:'Error on poll!!', iconURL:message.client.user.avatarURL()})
      .setTitle(`Error: No poll type identified.`)
      .setDescription("Details: There's no poll type identified! Maybe you have forgotten what type of poll you were making.")
      .addFields([
        {name:"Create a simple poll `k.poll simple`", value:"Creates a simple Yes or No poll. Requirements: Question"},
        {name:"Create a Multi Poll `k.poll multi`", value:"Creates a poll with multiple choices. Requirements: Question, Choices marked with quote marks (max of 20 choices)"}
      ])
      .setTimestamp()
      .setFooter({text:"Oops, it's not bad to try again right?", iconURL:message.client.user.avatarURL()})


    if (type == 'simple') {
      let question = args.slice(1).join(" ");

      message.delete()

      let tanongEmbed = new EmbedBuilder()
        .setColor('#e0b0ff')
        .setAuthor({name:'New poll!', iconURL:message.author.avatarURL()})
        .setTitle(`${message.author.tag} Has a question!`)
        .setDescription(question)
        .setTimestamp()
        .setFooter({text:'React with the reactions below!', iconURL:message.client.user.avatarURL()})

      await message.channel.send({ content: "new poll!", embeds: [tanongEmbed] }).then(async message => {
        await message.react('✅');
        await message.react('✳')
        await message.react('❎')
      })
    } else
      if (type == 'multi') {
        message.delete()
        var options = [
          '🇦',
          '🇧',
          '🇨',
          '🇩',
          '🇪',
          '🇫',
          '🇬',
          '🇭',
          '🇮',
          '🇯',
          '🇰',
          '🇱',
          '🇲',
          '🇳',
          '🇴',
          '🇵',
          '🇶',
          '🇷',
          '🇸',
          '🇹',
          '🇺',
          '🇻',
          '🇼',
          '🇽',
          '🇾',
          '🇿',
        ];

        var question = []

        for (let i = 1; i < args.length; i++) {
          if (args[i].startsWith('"')) break;
          else question.push(args[i]);
        }

        question = question.join(' ');
        if (!question) return message.channel.send("Erm, where's the question?")

        // Defining the choices...
        const choices = [];

        const regex = /(["'])((?:\\\1|\1\1|(?!\1).)*)\1/g;
        let match;
        while (match = regex.exec(args.join(' '))) choices.push(match[2]);

        // Creating and sending embed...
        let content = [];
        for (let i = 0; i < choices.length; i++) content.push(`${options[i]} ${choices[i]}`);
        content = content.join('\n');
        if (0 < choices.length < 1) return message.channel.send("Erm, there's no choices to choose from.")

        if (choices.length > 20) return message.channel.send("Sorry, max amt of Choices is 20! Reason: Discord Limitations -- Only 20 reacts per message.")
        var embed = new EmbedBuilder()
          .setColor('#E0B0FF')
          .setTitle(`**${question}**`)
          .setDescription(content);

        message.channel.send({ content: `:bar_chart: ${message.author.tag} started a poll`, embeds: [embed] })
          .then(async m => {
            for (let i = 0; i < choices.length; i++) await m.react(options[i]);
          });
      } else
        message.channel.send({ content: "erm, you didn't state what kind of poll.", embeds: [errorEmbed] })
  }
}